const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Simple POST endpoint
app.post('/', (req, res) => {
  console.log('Received data:', req.body);
  res.sendStatus(200);
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
});
