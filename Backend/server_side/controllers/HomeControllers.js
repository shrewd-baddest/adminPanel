import pool from '../databse.js';

const getCount = async (table, dateColumn, label) => {
    const sql = `
        SELECT COUNT(*) AS total 
        FROM ${table} 
        WHERE ${dateColumn} BETWEEN NOW() - INTERVAL 30 DAY AND NOW()
    `;
    const [rows] = await pool.query(sql);
    return { name: label, count: rows[0]?.total || 0 };
};

 export const customers = async (req, res) => {
    const sql = `
        SELECT COUNT(*) AS total 
        FROM person 
        WHERE created_at BETWEEN NOW() - INTERVAL 30 DAY AND NOW()
    `;
    try {
        const [result] = await pool.query(sql);
        const count = result[0]?.total || 0;
        const customer={ count, name: 'Total Customers' }
          res.status(200).json([customer]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const order = async (req, res) => {
    const sql = `
        SELECT COUNT(*) AS total 
        FROM orders 
        WHERE order_date BETWEEN NOW() - INTERVAL 30 DAY AND NOW()
    `;
    try {
        const [result] = await pool.query(sql);
        const count = result[0]?.total || 0;
        const orders={ count, name: 'Total Orders' }
         res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const delivery = async (req, res) => {
    const sql = `
        SELECT COUNT(*) AS total 
        FROM sales 
        WHERE created_at BETWEEN NOW() - INTERVAL 30 DAY AND NOW()
    `;
    try {
        const [result] = await pool.query(sql);
        const count = result[0]?.total || 0;
        const deliveries={ count, name: 'Total Deliveries' };
         res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const chartTable = async (req, res) => {
    try {
        const chart = await Promise.all([
            getCount('person', 'created_at', 'Total Customers'),
            getCount('orders', 'order_date', 'Total Orders'),
            getCount('sales', 'created_at', 'Total Deliveries')
        ]);
       console.log(`labels:${chart}`);
        res.status(200).json(chart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const sales=async(req,res)=>{
    const sql1=`SELECT 
  SUM(sale_items.quantity * sale_items.price) AS total_price,GROUP_CONCAT(DISTINCT product_id) AS ids
FROM 
  sale_items
WHERE 
  sale_items.created_at BETWEEN NOW() - INTERVAL 30 DAY AND NOW();`
try{
    const [rows]=await pool.query(sql1);
    const totalIncome = rows[0]?.total_price || 0;
    const productIds=rows[0].ids.split(',').filter(id => id.trim() !== '');
     if (productIds.length === 0) {
    return res.status(200).json([
      { name: 'Income', value: 0 },
      { name: 'Expenses', value: 0 },
      { name: 'Profit', value: 0 }
    ]);
  }

   const placeholder=productIds.map(()=>'?').join(',');

const sql2=`select SUM( supplier_items.price * sale_items.quantity) AS total_cost FROM products
JOIN supplier_items ON products.supplier_item_id = supplier_items.supplier_item_id
JOIN sale_items ON products.products_id = sale_items.product_id
WHERE sale_items.created_at BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND sale_items.product_id =${placeholder};`
    const [expenses]=await pool.query(sql2,productIds);
     const cost=expenses[0].total_cost|| 0;
   const profit= totalIncome-cost>0?totalIncome-cost:0;
     res.status(200).json([{name:'Income',value:totalIncome},{name:'expenses',value:cost},{name:'profit',value:profit}]);

}
catch(error){
    res.status(500).json({message:error.message});
}
     }
     
export const MostSold = async (req, res) => {
  const sql = `
    SELECT product_id, COUNT(*) AS sales
    FROM sale_items
    GROUP BY product_id
    ORDER BY sales DESC
    LIMIT 4
  `;

  try {
    const [order] = await pool.query(sql);

    if (!order || order.length === 0) {
      return res.status(200).json([]);
    }

    const productIds = order.map(row => row.product_id);
    const placeholders = productIds.map(() => '?').join(',');
    const sql2 = `SELECT * FROM products WHERE products_id IN (${placeholders})`;

    const [products] = await pool.query(sql2, productIds);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
