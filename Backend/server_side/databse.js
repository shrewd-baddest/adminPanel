import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const pool = mysql.createPool(dbConfig);
pool.getConnection()
  .then((connection) => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
export default pool;