const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");


// Register a new admin
const register = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;

    // Check if user already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new admin
    admin = new Admin({
      email,
      fullname,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    // Save admin
    await admin.save();

    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Admin login
const login = async (req, res) => {
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

    res.status(200).json({ msg: "Admin logged in successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Find admin and delete
    await Admin.findByIdAndDelete(adminId);

    res.status(200).json({ msg: "Admin deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { register, login, deleteAdmin };
