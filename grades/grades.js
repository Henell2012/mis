const router = require("express").Router();
const Grade = require("../models/Grade");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

// ✅ Teacher or Admin can add grades
router.post("/", auth, role("admin", "teacher"), async (req, res) => {
  try {
    const grade = new Grade({
      ...req.body,
      teacherId: req.user.id
    });

    await grade.save();
    res.json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin can view all grades
router.get("/", auth, role("admin"), async (req, res) => {
  const grades = await Grade.find();
  res.json(grades);
});

// ✅ Student can view their own grades
router.get("/my", auth, role("student"), async (req, res) => {
  const grades = await Grade.find({ studentId: req.user.id });
  res.json(grades);
});

// ✅ Teacher can view grades they assigned
router.get("/teacher", auth, role("teacher"), async (req, res) => {
  const grades = await Grade.find({ teacherId: req.user.id });
  res.json(grades);
});

module.exports = router;
