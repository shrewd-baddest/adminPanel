import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
console.log("DB HOST:", process.env.DB_HOST);
console.log("DB USER:", process.env.DB_USER);
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT|| 3306, 
   waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

//     host: process.env.DB_HOST , 
//   user: process.env.DB_USER || 'root', 
//   password: process.env.DB_PASSWORD ,
//   database: process.env.DB_NAME,
//  port: process.env.DB_PORT|| 3306, // Default MySQL port
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
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