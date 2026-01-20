import pool from '../databse.js';

export const customersDetails = async (req, res) => {


    try {


        const allCustomers= await pool.query('SELECT * FROM person');
        const newCustomers= await pool.query(`select * from  person
            where created_at BETWEEN NOW() - INTERVAL '30 days' AND NOW()`);
            const activeCustomers= await pool.query(`select p.ID,p.firstname,p.email,p.created_at,max(o.order_date)
                 as latest_order from person p 
            inner join orders o on p.ID= o.user_id
            GROUP BY p.ID
            ORDER BY latest_order DESC LIMIT 50;`);

        res.status(200).json({ allCustomers: allCustomers.rows, newCustomers: newCustomers.rows, activeCustomers: activeCustomers.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
