const Enquiry = require("../models/enquiryModel");
const Product = require("../models/productModel");
const { sendAdminNotification } = require("../utils/email");

exports.createEnquiry = async (req, res) => {
  const { name, email, phone, message, productId } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    // 1️⃣ Save enquiry in database
    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone,
      message,
      product_id: productId
    });

    // 2️⃣ Get Product Details
    const product = await Product.getById(productId);

    // 3️⃣ Email admin with enquiry + product details
    await sendAdminNotification({
      name,
      email,
      phone,
      message,
      product,
      product_id: productId
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      id: newEnquiry.id
    });

  } catch (err) {
    console.error("Enquiry submission error:", err);
    res.status(500).json({ message: "Failed to submit enquiry" });
  }
};


exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.getAll();
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};

exports.deleteEnquiry = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Enquiry.delete(id);

    if (result.deleted === 0) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.json({ message: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete enquiry" });
  }
};
