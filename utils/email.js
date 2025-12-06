const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS
  }
});

exports.sendAdminNotification = async (data) => {
  const { name, email, phone, message, product } = data;

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_NOTIFY,
    subject: `New Enquiry for: ${product.name}`,
    html: `
      <h2>📩 New Product Enquiry</h2>
      
      <h3>🧑 User Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong> ${message}</p>

      <hr/>

      <h3>📦 Product Details</h3>
      <p><strong>Product Name:</strong> ${product.name}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Price:</strong> ₹${product.price}</p>
      <p><strong>Description:</strong> ${product.short_desc}</p>
      
      ${
        product.image_url
          ? `<img src="${product.image_url}" width="250" style="margin-top:10px;border-radius:8px;" />`
          : ""
      }

      <br/><br/>
      <p>You can view the full enquiry inside your admin dashboard.</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
