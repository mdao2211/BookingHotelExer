const db = require('../models/sqlite.db');

class UserRepository {
  async findAll() {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
  }

  async findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }

  async create(user) {
    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    return stmt.run(user.name, user.email);
  }
}

module.exports = new UserRepository();