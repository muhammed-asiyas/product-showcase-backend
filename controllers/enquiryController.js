const Enquiry = require("../models/enquiryModel");

exports.createEnquiry = async (req, res) => {
  const { name, email, phone, message, productId } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone,
      message,
      product_id: productId
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      id: newEnquiry.id
    });
  } catch (err) {
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
