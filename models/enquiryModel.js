const db = require("../db");

const Enquiry = {
  create: ({ product_id, name, email, phone, message }) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO enquiries (product_id, name, email, phone, message)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(sql, [product_id, name, email, phone, message], function (err) {
        if (err) {
          console.error("Database Insert Error:", err);
          return reject(err);
        }
        resolve({ id: this.lastID });
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT e.*, p.name AS product_name
        FROM enquiries e
        LEFT JOIN products p ON e.product_id = p.id
        ORDER BY e.created_at DESC
      `;

      db.all(sql, [], (err, rows) => {
        if (err) {
          console.error("Database Fetch Error:", err);
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
};

module.exports = Enquiry;
