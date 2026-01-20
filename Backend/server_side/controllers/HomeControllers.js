import pool from '../databse.js';

const getCount = async (table, dateColumn, label) => {
    const sql = `
        SELECT COUNT(*) AS total 
        FROM ${table} 
        WHERE ${dateColumn} BETWEEN NOW() - INTERVAL '30 days' AND NOW()
    `;
    const rows = await pool.query(sql);
    return { name: label, count: rows.rows[0]?.total || 0 };
};

 export const customers = async (req, res) => {
    const sql = `
        SELECT COUNT(*) AS total 
        FROM person 
        WHERE created_at BETWEEN NOW() - INTERVAL '30 days' AND NOW()
    `;
    try {
        const result = await pool.query(sql);
        const count = result.rows[0]?.total || 0;
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
        WHERE order_date BETWEEN NOW() - INTERVAL '30 days' AND NOW()
    `;
    try {
        const result = await pool.query(sql);
        const count = result.rows[0]?.total || 0;
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
        WHERE created_at BETWEEN NOW() - INTERVAL '30 days' AND NOW()
    `;
    try {
        const result = await pool.query(sql);
        const count = result.rows[0]?.total || 0;
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
         res.status(200).json(chart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const sales = async (req, res) => {
  const sql1 = `
    SELECT 
      SUM(sale_items.quantity * sale_items.price) AS total_price,
      STRING_AGG(DISTINCT sale_items.product_id::text, ',') AS ids
    FROM sale_items
    WHERE sale_items.created_at BETWEEN NOW() - INTERVAL '30 days' AND NOW();
  `;

  try {
    const rows = await pool.query(sql1);
    const totalIncome = rows.rows[0]?.total_price || 0;
    const ids = rows.rows[0]?.ids;
const productIds = ids ? ids.split(',').filter(id => id.trim() !== '') : [];


    // If there are no products sold in last 30 days
    if (productIds.length === 0) {
      return res.status(200).json([
        { name: 'Income', value: 0 },
        { name: 'Expenses', value: 0 },
        { name: 'Profit', value: 0 }
      ]);
    }

     const placeholders = productIds.map((_, i) => `$${i + 1}`).join(',');

    const sql2 = `
      SELECT 
        SUM(supplier_items.price * sale_items.quantity) AS total_cost 
      FROM products
      JOIN supplier_items ON products.supplier_item_id = supplier_items.supplier_item_id
      JOIN sale_items ON products.products_id = sale_items.product_id
      WHERE sale_items.created_at BETWEEN NOW() - INTERVAL '30 days' AND NOW()
        AND sale_items.product_id IN (${placeholders});
    `;

    const expenses = await pool.query(sql2, productIds);
    const totalCost = expenses.rows[0]?.total_cost || 0;
    const profit = Math.max(totalIncome - totalCost, 0);

    res.status(200).json([
      { name: 'Income', value: totalIncome },
      { name: 'Expenses', value: totalCost },
      { name: 'Profit', value: profit }
    ]);
  } catch (error) {
    console.error('Error calculating sales summary:', error);
    res.status(500).json({ message: error.message });
  }
};

     
export const MostSold = async (req, res) => {
  const sql = `
    SELECT product_id, COUNT(*) AS sales
    FROM sale_items
    GROUP BY product_id
    ORDER BY sales DESC
    LIMIT 4
  `;

  try {
    const order = await pool.query(sql);

    if (!order.rows || order.rows.length === 0) {
      return res.status(200).json([]);
    }

    const productIds = order.rows.map(row => row.product_id);
    const placeholders = productIds.map((_, i) => `$${i + 1}`).join(',');
    const sql2 = `SELECT * FROM products WHERE products_id IN (${placeholders})`;

    const products = await pool.query(sql2, productIds);

    res.status(200).json(products.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
