const router = require("express").Router();
const Student = require("../models/Student");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

// ✅ Only ADMIN can create student
router.post("/", auth, role("admin"), async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// ✅ Admin & Teacher can view students
router.get("/", auth, role("admin", "teacher"), async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// ✅ Only ADMIN can delete
router.delete("/:id", auth, role("admin"), async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
