import pool from '../databse.js';


export const getSettings = async (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const userId =req.user.id;
     try {
         const [rows] = await pool.query(sql, [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
