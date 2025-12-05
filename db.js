const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./product_showcase.sqlite");

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      short_desc TEXT,
      long_desc TEXT,
      price DECIMAL(10, 2),
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    INSERT INTO products (name, category, short_desc, long_desc, price, image_url) VALUES
    ('Smartphone X1', 'Electronics', 'High-performance smartphone.', 'A powerful smartphone with 6.5-inch display, 8GB RAM and 128GB storage.', 24999.00, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5'),
('Bluetooth Headphones', 'Electronics', 'Noise-cancelling headphones.', 'Premium wireless headphones with deep bass and 40hrs battery backup.', 3999.00, 'https://res.cloudinary.com/dlhgbo0ji/image/upload/v1764943766/61IKUYZYfrL._AC_UY327_FMwebp_QL65__fwefug.webp'),
('Gaming Laptop X', 'Electronics', 'Fast gaming laptop.', 'A high-end gaming laptop with RTX graphics and 16GB RAM.', 85999.00, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'),
('LED 4K TV 43"', 'Electronics', 'Ultra HD Smart TV.', 'Stunning 43-inch 4K LED smart TV with streaming apps.', 29999.00, 'https://res.cloudinary.com/dlhgbo0ji/image/upload/v1764943781/81Z_OT5lv4L._SX522__ypkjg8.jpg'),
('Portable Speaker', 'Electronics', 'Wireless Bluetooth speaker.', 'Compact speaker with powerful sound and waterproof design.', 2499.00, 'https://res.cloudinary.com/dlhgbo0ji/image/upload/v1764943792/81bNiiPk68L._SX522__iv438m.jpg'),
('Smartwatch Pro', 'Electronics', 'Health tracking smartwatch.', 'Advanced smartwatch with heart-rate monitor and GPS.', 5499.00, 'https://res.cloudinary.com/dlhgbo0ji/image/upload/v1764943803/61BoaOUf_KL._SX679__mqwgzr.jpg'),
('DSLR Camera D3500', 'Electronics', 'Professional DSLR camera.', '24.2MP DSLR camera great for photography beginners and experts.', 38999.00, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f'),
('Wireless Keyboard', 'Electronics', 'Slim wireless keyboard.', 'Comfortable wireless keyboard with silent keys.', 1499.00, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3'),
('External Hard Drive 1TB', 'Electronics', 'Portable HDD.', 'Fast and durable 1TB external hard drive for backup.', 3999.00, 'https://res.cloudinary.com/dlhgbo0ji/image/upload/v1764943819/51oCAuoDQkL._SX679__tyvgj4.jpg'),
('USB-C Fast Charger', 'Electronics', '20W quick charger.', 'Fast USB-C charger compatible with all major phones.', 999.00, 'https://res.cloudinary.com/dlhgbo0ji/image/upload/v1764943830/51SlfeRaHpL._SX522__dmwjbu.jpg'),
('The Power of Habit', 'Books', 'Self-help bestseller.', 'A book about building effective habits and breaking bad ones.', 499.00, 'https://images.unsplash.com/photo-1512820790803-83ca734da794'),
('Think and Grow Rich', 'Books', 'Motivational classic.', 'A guide to achieving personal and financial success.', 349.00, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f'),
('The Alchemist', 'Books', 'Inspirational novel.', 'A story of self-discovery and following your dreams.', 199.00, 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9'),
('Python Programming Basics', 'Books', 'Learn Python.', 'Beginner-friendly tutorial book for Python programming.', 599.00, 'https://res.cloudinary.com/dlhgbo0ji/image/upload/v1764944455/71H0XTjr7dL._SY385__bzvlwx.jpg'),
('JavaScript for Beginners', 'Books', 'JS guide.', 'A modern step-by-step guide to JavaScript programming.', 549.00, 'https://res.cloudinary.com/dlhgbo0ji/image/upload/v1764944463/61HUuiDH_0L._SY385__srpnw5.jpg'),
('React.js Mastery', 'Books', 'Frontend development.', 'Master React.js with real-world examples and projects.', 650.00, 'https://images.unsplash.com/photo-1587620962725-abab7fe55159'),
('Data Structures & Algorithms', 'Books', 'Coding fundamentals.', 'Complete guide to DSA for interviews and learning.', 699.00, 'https://images.unsplash.com/photo-1553729459-efe14ef6055d');
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);
});

module.exports = db;
