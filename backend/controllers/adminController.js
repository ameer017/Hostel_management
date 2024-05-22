const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils");

// Register a new admin
const register = asyncHandler(async (req, res) => {
  try {
    const { email, fullname, password } = req.body;

    if (!fullname || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all the required fields.");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 characters.");
    }

    // Check if user already exists
    const userExist = await Admin.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new admin
    const admin = await Admin.create({
      fullname,
      email,
      password,
    });

    const token = generateToken(admin._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    if (admin) {
      const { _id, fullname, email, role } = admin;

      res.status(201).json({
        _id,
        fullname,
        email,
        token,
        role,
      });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Admin login
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const token = generateToken(admin._id);

    if (admin && isMatch) {
      // Send HTTP-only cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      });

      const { _id, fullname, email, role } = admin;

      res.status(201).json({
        _id,
        fullname,
        email,
        token,
        role,
      });
    } else {
      res.status(500);
      throw new Error("Something went wrong, please try again");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete an admin
const deleteAdmin = asyncHandler(async (req, res) => {
  try {
    const admin = Admin.findById(req.params.id);

    if (!admin) {
      res.status(404);
      throw new Error("User not found");
    }

    await admin.deleteOne();
    res.status(200).json({
      message: "Admin data deleted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Get details of a single admin
const getAdmin = asyncHandler(async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await Admin.findById(adminId);

    if (admin) {
      const { _id, fullname, email, role } = admin;

      res.status(200).json({
        _id,
        fullname,
        email,
        role,
      });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (err) {
    console.error('Error retrieving admin:', err.message);
    res.status(500).json({ message: "Server Error" });
  }
});


// Get details of all admins
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().sort("-createdAt").select("-password");
  if (!admins) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(admins);
});

const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    const { _id, fullname, email, role } = admin;

    admin.email = email;
    admin.fullname = req.body.name || fullname;
    admin.role = req.body.role || role;

    const updatedAdmin = await admin.save();

    res.status(200).json({
      _id: updatedAdmin._id,
      fullname: updatedAdmin.fullname,
      role: updatedAdmin.role,
      email: updatedAdmin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logout successful" });
});

module.exports = {
  register,
  login,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
  logoutAdmin
};
