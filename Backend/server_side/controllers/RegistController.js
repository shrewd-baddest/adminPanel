import pool from '../databse.js';
import bcrypt from "bcrypt";
 

 const regist = async (req, res) => {
    
    
    // Destructure fields from request body
const { ID, Name, Role, passWord, email } = req.body;
console.log(req.body);
   if (!ID || !Name || !Role || !passWord || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const sql = `INSERT INTO users (id,name,role,passWord,email)
                     VALUES (?, ?, ?, ?, ?);`
        const hashedPassword = await bcrypt.hash(passWord, 10);
        const params = [ID, Name, Role, hashedPassword, email];
        await pool.query(sql, params);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }    
}

export default regist;