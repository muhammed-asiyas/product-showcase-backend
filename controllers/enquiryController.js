const Enquiry = require("../models/enquiryModel");
const Product = require("../models/productModel");
const resend = require("../utils/resend");
const { adminNotificationHtml } = require("../utils/emailTemplates");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // provided by you

exports.createEnquiry = async (req, res) => {
  const { name, email, phone, message, productId } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    // 1. Save to DB
    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone,
      message,
      product_id: productId,
    });

    // 2. Fetch product details (may be null)
    const product = productId ? await Product.getById(productId) : null;

    // 3. Build email HTML
    const html = adminNotificationHtml({
      name,
      email,
      phone,
      message,
      product,
      enquiryId: newEnquiry.id,
    });

    // 4. Send email using Resend API
    await resend.emails.send({
      from: process.env.RESEND_FROM || "Enquiry <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `New Enquiry${product ? ` — ${product.name}` : ""}`,
      html,
    });
    return res
      .status(201)
      .json({ message: "Enquiry submitted successfully", id: newEnquiry.id });
  } catch (err) {
    console.error("Enquiry submission error:", err);
    return res.status(500).json({ message: "Failed to submit enquiry" });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.getAll();
    res.json(enquiries);
  } catch (err) {
    console.error("Failed to fetch enquiries:", err);
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};

exports.deleteEnquiry = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Enquiry.delete(id);
    if (result.deleted === 0)
      return res.status(404).json({ message: "Enquiry not found" });
    res.json({ message: "Enquiry deleted successfully" });
  } catch (err) {
    console.error("Failed to delete enquiry:", err);
    res.status(500).json({ message: "Failed to delete enquiry" });
  }
};
