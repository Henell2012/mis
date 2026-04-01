// Import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===== DATABASE CONNECTION =====
mongoose.connect("mongodb://127.0.0.1:27017/mis", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ===== ROUTES =====
app.use("/students", require("./routes/students"));
app.use("/attendance", require("./routes/attendance"));

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("MIS Backend Running 🚀");
});

// ===== START SERVER =====
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
