import pool from '../databse.js';
import bcrypt from "bcrypt";
 

 const regist = async (req, res) => {
    if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }
    const passport=req.file.path
    console.log(passport);
    // Destructure fields from request body
const { staffName, id, role, payment,password,amount ,email} = req.body;
    if (!staffName || !id || !role || !payment || !email || !passport|| !amount) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const sql = `INSERT INTO users (id,name,email,password,passport,number,amount,status,role)
                     VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9);`
        const hashedpassword = await bcrypt.hash(password, 10);
        const params = [id,staffName,email,hashedpassword,passport,payment,amount,'unpaid',role ];
        await pool.query(sql, params);
        res.status(201).json({ message: "successful" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }    
}

export default regist;