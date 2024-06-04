const mongoose = require("mongoose");

const guardianSchema = new mongoose.Schema({
  guardianName: {
    type: String,
    required: true,
  },
  guardianEmail: {
    type: String,
    required: [true, "Please add an email"],
    trim: true,
  },
});

const studentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Female", "Male"],
    },
    nationality: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      trim: true,
      unique: true,
    },
    guardian: guardianSchema,
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },
    role: {
      type: String,
      enum: ["student"],
      default: "student",
    },
    checkedIn: {
      type: Boolean,
      default: false,
    },
    checkInTime: {
      type: Date,
      default: null,
    },
    checkOutTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    minimize: false,
    toJSON: { getters: true },
  }
);

const date = new Date();

const formatData = (input) => {
  if (input > 9) {
    return input;
  } else return `0${input}`;
};

const formatHour = (input) => {
  if (input > 12) {
    return input - 12;
  }
  return input;
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

studentSchema.methods.checkIn = function () {
  this.checkedIn = true;
  this.checkInTime = format24Hour(format);
  this.checkOutTime = null;
};

studentSchema.methods.checkOut = function () {
  this.checkedIn = false;
  this.checkOutTime = format24Hour(format);
  this.checkInTime = null;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
