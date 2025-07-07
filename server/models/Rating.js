class Rating {
  static createOrUpdate({ user_id, store_id, rating }) {
    const query = `
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, store_id) 
      DO UPDATE SET rating = $3, updated_at = NOW()
      RETURNING *
    `;
    const values = [user_id, store_id, rating];
    return { query, values };
  }

  static getByUserAndStore(user_id, store_id) {
    const query = 'SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2';
    return { query, values: [user_id, store_id] };
  }

  static getByStore(store_id) {
    const query = 'SELECT * FROM ratings WHERE store_id = $1';
    return { query, values: [store_id] };
  }

  static getStats() {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM users) as user_count,
        (SELECT COUNT(*) FROM stores) as store_count,
        (SELECT COUNT(*) FROM ratings) as rating_count
    `;
    return { query, values: [] };
  }
}

module.exports = Rating;