const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  studentId: String,
  subject: String,
  score: Number,
  teacherId: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Grade", GradeSchema);
