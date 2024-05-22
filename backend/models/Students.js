const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  Hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['student'],
    default: 'student',
  },
  studentAgent: {
    type: Array,
    default: [],
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
}, {
  timestamps: true,
  minimize: false,
  toJSON: { getters: true },
});

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});


studentSchema.methods.checkIn = function() {
  this.checkedIn = true;
  this.checkInTime = new Date();
  this.checkOutTime = null;  
};


studentSchema.methods.checkOut = function() {
  this.checkedIn = false;
  this.checkOutTime = new Date();
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
