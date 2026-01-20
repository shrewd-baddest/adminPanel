import pool from '../databse.js'

export const staffNumber=async (req,res) => {
    const sql=`select * from users`;
    try {
        const number=await pool.query(sql);
        res.status(200).json(number.rows);
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }

}