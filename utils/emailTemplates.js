exports.adminNotificationHtml = ({
  name,
  email,
  phone,
  message,
  product,
  enquiryId,
}) => {
  return `
<div style="font-family: Arial, sans-serif; line-height:1.4; color: #111;">
<h2>📩 New Product Enquiry</h2>
<p><strong>Enquiry ID:</strong> ${enquiryId}</p>
<h3>👤 Customer Details</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || "Not provided"}</p>
<p><strong>Message:</strong> ${message}</p>


<hr />


<h3>📦 Product Details</h3>
${
  product
    ? `
<p><strong>Product ID:</strong> ${product.id}</p>
<p><strong>Name:</strong> ${product.name}</p>
<p><strong>Category:</strong> ${product.category}</p>
<p><strong>Price:</strong> ₹${product.price}</p>
<p><strong>Short Description:</strong> ${product.short_desc || "N/A"}</p>
${
  product.image_url
    ? `<img src="${product.image_url}" width="240" style="border-radius:6px; margin-top:8px;" />`
    : ""
}
`
    : "<p>Product information not available.</p>"
}


<hr />
<p>View enquiries in the admin panel to respond.</p>
</div>
`;
};
