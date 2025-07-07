const bcrypt = require('bcrypt');

const User = {
  create: ({ name, email, password, address, role = 'user' }) => {
    if (!name || !email || !password || !address) {
      console.error('❌ Missing fields in User.create');
      return null;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    return {
      query: `
        INSERT INTO users (name, email, password, address, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, address, role
      `,
      values: [name, email, hashedPassword, address, role]
    };
  },

  findByEmail: (email) => ({
    query: `SELECT * FROM users WHERE email = $1`,
    values: [email]
  }),

  findById: (id) => ({
    query: `SELECT * FROM users WHERE id = $1`,
    values: [id]
  }),

  updatePassword: (id, newHashedPassword) => ({
    query: `UPDATE users SET password = $1 WHERE id = $2`,
    values: [newHashedPassword, id]
  }),

  comparePasswords: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

 getAll: (role) => {
  if (role) {
    return {
      query: `
        SELECT id, name, email, address, role
        FROM users
        WHERE role = $1
        ORDER BY id ASC
      `,
      values: [role]
    };
  }
  return {
    query: `
      SELECT id, name, email, address, role
      FROM users
      ORDER BY id ASC
    `,
    values: []
  };
}


};

module.exports = User;
