const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const emailRoutes = require("./routes/emailRoutes");
const adminRoutes = require("./routes/adminRoutes");
const phoneRoutes = require("./routes/phoneRoutes");
const notifyRoutes = require("./routes/notifyRoutes");


app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/emails", emailRoutes);
app.use("/api/phones", phoneRoutes);
app.use("/send-reminder", notifyRoutes); // temp route

require("./cron/checkExpiry");

app.get("/", (req, res) => {
    res.send("This is root page !!");
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Connection error:", err);
  });