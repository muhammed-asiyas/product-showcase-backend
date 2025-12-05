// Load environment variables from .env file
require('dotenv').config(); 
const express = require("express");
const productController = require("./controllers/productController");
const enquiryController = require("./controllers/enquiryController");
// Ensure db is imported to run the schema creation
const db = require("./db"); 
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors());

// --- Routes ---

// Product Routes
app.get("/api/products", productController.getProducts);
app.get("/api/products/:id", productController.getProductById);

// Enquiry Routes
app.post("/api/enquiries", enquiryController.createEnquiry);
app.get("/api/enquiries", enquiryController.getEnquiries);
app.delete("/api/enquiries/:id", enquiryController.deleteEnquiry);

// Basic Error Handler for routes not found
app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Database file: ${process.env.DB_FILE}`);
});