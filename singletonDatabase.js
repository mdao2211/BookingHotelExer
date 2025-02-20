import pkg from "pg";
const { Pool } = pkg;

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "postgres",
        password: "22112003",
        port: 5432,
      });

      console.log("✅ Connected to PostgreSQL Database");

      Database.instance = this;
    }
    return Database.instance;
  }

  async query(text, params) {
    return this.pool.query(text, params);
  }

  async close() {
    await this.pool.end();
    console.log("🛑 Database connection closed");
  }
}

// Xuất instance dưới dạng default export
const db = new Database();
export default db;
