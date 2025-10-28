import dotenv from 'dotenv';
dotenv.config();
import pool from "../databse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
  
 const login = async (req,res) => {
  const { Emaili,Code,Email } = req.body;
   try {
    // Check if user exists
    let user;
    if(!Email){
    const [rows] = await pool.query('SELECT * FROM users  WHERE email = ?', [Emaili]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  user = rows[0];
     // Compare password
    const isMatch = await bcrypt.compare(Code, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }}
  
    else if(Email){
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [Email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email try the other way' });
    }
     
  user = rows[0];  
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token,status:"success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export default login;