const Student = require("../models/studentModel");
const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");
const { generateUniqueId } = require("../utils/generateUniqueId");

const ensureUniqueId = async () => {
  let uniqueId;
  let idExists = true;

  while (idExists) {
    uniqueId = generateUniqueId();
    const existingStudent = await Student.findById(uniqueId);
    idExists = !!existingStudent;
  }

  return uniqueId;
};

const date = new Date();

const formatData = (input) => {
  return input > 9 ? input : `0${input}`;
};

const formatHour = (input) => {
  return input > 12 ? input - 12 : input;
};

const format = {
  dd: formatData(date.getDate()),
  mm: formatData(date.getMonth() + 1),
  yyyy: date.getFullYear(),
  HH: formatData(date.getHours()),
  hh: formatData(formatHour(date.getHours())),
  MM: formatData(date.getMinutes()),
  SS: formatData(date.getSeconds()),
};

const format24Hour = ({ dd, mm, yyyy, HH, MM, SS }) => {
  return `${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`;
};

const registerStudent = asyncHandler(async (req, res) => {
  try {
    const { email, name, age, nationality, g_name, g_email, gender, roomNum } =
      req.body;

    if (
      !email ||
      !name ||
      !age ||
      !nationality ||
      !g_name ||
      !g_email ||
      !gender ||
      !roomNum
    ) {
      res.status(400);
      throw new Error("Please fill in all the required fields.");
    }

    const studentExist = await Student.findOne({ email });

    if (studentExist) {
      return res.status(400).json({ msg: "Student already existss" });
    }

    const room = await Room.findOne({ roomNumber: roomNum });

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    if (room.roomStatus !== "available") {
      return res.status(400).json({ msg: "Room is not available" });
    }

    const uniqueId = await ensureUniqueId();

    const student = await Student.create({
      _id: uniqueId,
      email,
      name,
      age,
      nationality,
      guardian: {
        guardianName: g_name,
        guardianEmail: g_email,
      },
      gender,
      room: room._id,
      checkedIn: true,
      checkInTime: format24Hour(format),
    });

    room.roomOccupancy.push(student._id);

    if (room.roomOccupancy.length >= room.roomCapacity) {
      room.roomStatus = "unavailable";
    }

    await room.save();

    res.status(201).json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().sort("-createdAt");

  if (!students) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(students);
});

const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params._id);

  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params._id);

  if (student) {
    const { email, name, age, nationality, guardian, gender } = student;

    student.email = email;
    student.name = req.body.name || name;

    student.age = req.body.age || age;
    student.nationality = req.body.nationality || nationality;
    student.guardian.guardianName = req.body.g_name || guardian.guardianName;
    student.guardian.guardianEmail = req.body.g_email || guardian.guardianEmail;
    student.gender = req.body.gender || gender;

    const updatedStudent = await student.save();

    res.status(200).json(updatedStudent);
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const changeStudentRoom = asyncHandler(async (req, res) => {
  const { studentId, newRoomNum } = req.body;

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({ msg: "Student not found" });
  }

  const currentRoom = await Room.findById(student.room);
  if (currentRoom) {
    currentRoom.roomOccupancy = currentRoom.roomOccupancy.filter(
      (occupant) => occupant.toString() !== studentId
    );

    if (currentRoom.roomOccupancy.length < currentRoom.roomCapacity) {
      currentRoom.roomStatus = "available";
    }
    await currentRoom.save();
  }

  const newRoom = await Room.findOne({ roomNumber: newRoomNum });
  if (!newRoom) {
    return res.status(404).json({ msg: "New room not found" });
  }

  if (newRoom.roomStatus !== "available") {
    return res.status(400).json({ msg: "New room is not available" });
  }

  student.room = newRoom._id;

  // Update new room occupancy
  newRoom.roomOccupancy.push(student._id);
  if (newRoom.roomOccupancy.length >= newRoom.roomCapacity) {
    newRoom.roomStatus = "unavailable";
  }
  await newRoom.save();
  await student.save();

  res.status(200).json({ msg: "Room changed successfully", student, newRoom });
});

const updateCheckInStatus = asyncHandler(async (req, res) => {
  const { studentId, action, roomNumber } = req.body;

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({ msg: "Student not found" });
  }

  if (action === "checkIn") {
    student.checkedIn = true;
  } else if (action === "checkOut") {
    student.checkedIn = false;
    student.checkOutTime = format24Hour(format);
  } else {
    return res.status(400).json({ msg: "Invalid action" });
  }

  const room = await Room.findOne({ roomNumber });
  if (!room) {
    return res.status(404).json({ msg: "Room not found" });
  }

  if (action === "checkIn") {
    room.roomOccupancy.push(studentId);
  } else if (action === "checkOut") {
    room.roomOccupancy.pull(studentId);
  }

  await room.save();
  await student.save();

  res.status(200).json({ msg: `Student ${action} successfully`, student, room });
});


const deleteStudent = asyncHandler(async (req, res) => {
  const studentId = req.params._id;
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      res.status(404);
      throw new Error("Student not found");
    }

    // Remove studentId from roomOccupancy array in Room collection
    await Room.updateMany(
      { roomOccupancy: studentId },
      { $pull: { roomOccupancy: studentId } }
    );

    await student.deleteOne();
    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  registerStudent,
  getAllStudents,
  getStudent,
  updateStudentProfile,
  changeStudentRoom,
  updateCheckInStatus,
  deleteStudent,
};
