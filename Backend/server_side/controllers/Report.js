 import pool from '../databse.js';

export const revenue = async (req, res) => {
  const sql1 = `SELECT SUM(amount) AS staffPayment FROM users`;
  const sql2 = `
    SELECT SUM(total) AS supplierPayments
    FROM (
      SELECT SUM(price) AS total
      FROM supplier_items
      GROUP BY suplier_id
    ) t
  `;

  try {
    const [salaryRows, supplierRows] = await Promise.all([
      pool.query(sql1),
      pool.query(sql2),
    ]);

const staffPayment = parseInt(salaryRows.rows[0].staffPayment || 0);
    const supplierPayments =parseInt(supplierRows.rows[0].supplierPayments || 0);

    const totalRevenue = staffPayment + supplierPayments;

    res.json({
      staffPayment,
      supplierPayments,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const salesReport=async(req,res)=>{
  const sql=`SELECT 
    p.ID AS customer_id,
    p.firstname AS customer_name,
    o.id AS order_id,
    pr.products_name,
    si.quantity,
    si.price,
    (si.quantity * si.price) AS total_price
FROM sale_items si
INNER JOIN orders o ON o.id = si.order_id
INNER JOIN products pr ON pr. products_id= si.product_id
INNER JOIN person p ON p.ID = o.user_id
ORDER BY p.ID, o.id;`
try {
  const results=await pool.query(sql)
res.status(200).json(results.rows)
} catch (error) {
     res.status(500).json({ message: error.message });
}

}
export const salesTrends = async (req, res) => {
  const sql = `
    SELECT DATE(created_at) AS sale_date, 
           SUM(quantity * price) AS total_sales
    FROM sale_items
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
    LIMIT 10;
  `;

  try {
    const results = await pool.query(sql);

     const formatted = results.rows.map(item => {
      const date = new Date(item.sale_date);
      return {
        sale_date: date.toISOString().split('T')[0], // YYYY-MM-DD
        total_sales: item.total_sales
      };
    });

    res.status(200).json(formatted); // send JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const productTypes=async(req,res)=>{
  const sql=`select c.category_name, count(s.sale_id) as sale_count
  from sale_items s
  join products p on s.product_id = p.products_id
  join category c on p.category_id = c.category_id
  group by c.category_name;`
  try {
    const results=await pool.query(sql)
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
