const db = require("../db");

exports.getAll = (options = {}) => {
  return new Promise((resolve, reject) => {
    const { search = "", category = "", page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT *
      FROM products
      WHERE 1=1
    `;
    const params = [];

    // 1. Category Filter
    if (category) {
      sql += ` AND category = ?`;
      params.push(category);
    }

    // 2. Search Filter (by name or short_desc)
    if (search) {
      sql += ` AND (name LIKE ? OR short_desc LIKE ?)`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }
    
    // Count total products matching the criteria for pagination metadata
    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) AS total');

    // 3. Pagination (LIMIT and OFFSET)
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    // Get the total count
    db.get(countSql, params.slice(0, params.length - 2), (err, countRow) => {
      if (err) return reject(err);
      const total = countRow.total;

      // Get the paginated products
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve({
          products: rows,
          total: total,
          page: page,
          limit: limit,
          totalPages: Math.ceil(total / limit)
        });
      });
    });
  });
};

// Get one product (No change needed)
exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};