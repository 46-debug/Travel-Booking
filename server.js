const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Use the built-in JSON parser

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/formDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process on connection failure
  });

// Define Schema and Model
const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  availableDates: Date,
  images: [String],
});

const paxSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  travelers: Number,
  location: String,
  startDate: String,
  price: Number,
});

const Form = mongoose.model("Form", formSchema); // Singular model name
const PaxInfo = mongoose.model("PaxInfo", paxSchema); // Singular model name

// Routes
app.post("/api/form", async (req, res) => {
  try {
    const { title, description, price, availableDates, images } = req.body;
    const newForm = new Form({ title, description, price, availableDates, images });
    await newForm.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

app.post("/api/paxInfo", async (req, res) => {
  try {
    const { name, email, number, travelers, location, startDate, price } = req.body;
    const newPaxInfo = new PaxInfo({ name, email, number, travelers, location, startDate, price });
    await newPaxInfo.save();
    res.status(201).json({ message: "Pax info saved successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

// API Route to get all form data
app.get("/api/form", async (req, res) => {
  try {
    const data = await Form.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
});

app.get("/api/form/:id", async (req, res) => {
  try {
    const data = await Form.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
});

// Get all pax data
app.get("/api/paxInfo", async (req, res) => {
  try {
    const data = await PaxInfo.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
});

app.get("/api/paxInfo/:id", async (req, res) => {
  try {
    const data = await PaxInfo.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
});

app.get("/admin", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.get("/", (req,res)=>{
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
