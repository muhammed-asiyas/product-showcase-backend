const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    // Set defaults and convert to numbers
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    if (limit > 50) return res.status(400).json({ message: "Limit cannot exceed 50." });

    const data = await Product.getAll({ search, category, page, limit });
    
    // Return structured response with pagination metadata
    res.json({
        products: data.products,
        meta: {
            total: data.total,
            page: data.page,
            limit: data.limit,
            totalPages: data.totalPages
        }
    });

  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};