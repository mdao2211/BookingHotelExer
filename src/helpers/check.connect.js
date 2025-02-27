const pool = require('../models/mysql.db');

const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

module.exports = {
  checkConnection
};