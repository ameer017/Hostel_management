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

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
