
class Store {
  static create({ name, email, address, owner_id }) {
    const query = `
      INSERT INTO stores (name, email, address, owner_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, address, owner_id, created_at
    `;
    const values = [name, email, address, owner_id];
    return { query, values };
  }

  static getAll() {
    const query = `
      SELECT
        s.*,
        u.name AS owner_name,
        (
          SELECT COALESCE(AVG(rating),0)
          FROM ratings
          WHERE store_id = s.id
        ) AS average_rating
      FROM stores s
      LEFT JOIN users u ON s.owner_id = u.id
      ORDER BY s.id ASC
    `;
    return { query, values: [] };
  }

  static getById(id) {
    const query = `
      SELECT
        s.*,
        u.name AS owner_name,
        (
          SELECT COALESCE(AVG(rating),0)
          FROM ratings
          WHERE store_id = s.id
        ) AS average_rating
      FROM stores s
      LEFT JOIN users u ON s.owner_id = u.id
      WHERE s.id = $1
    `;
    return { query, values: [id] };
  }

  static getByOwner(owner_id) {
    const query = `
      SELECT
        s.*,
        (
          SELECT COALESCE(AVG(rating),0)
          FROM ratings
          WHERE store_id = s.id
        ) AS average_rating
      FROM stores s
      WHERE s.owner_id = $1
      ORDER BY s.id ASC
    `;
    return { query, values: [owner_id] };
  }
}

module.exports = Store;


module.exports = Store;