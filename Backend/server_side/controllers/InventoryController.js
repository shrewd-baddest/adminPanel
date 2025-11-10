import pool from '../databse.js'

export const productDetails=async(req,res)=>{
    const sql=`SELECT * FROM products`
    try{
        const [products]=await pool.query(sql);
        res.status(200).json(products);

    }
    catch(error){
res.status(400).json({ message: error.message });    }
}

export const Deletion = async (req, res) => {
  console.log("Delete request received with body:", req.body);
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    // 1. Delete from mpesa request where order_id references order_items with this product_id
    const getOrderItemsSQL = `SELECT id FROM order_items WHERE product_id = ?`;
    const [orderItems] = await pool.query(getOrderItemsSQL, [productId]);

    const orderItemIds = orderItems.map(item => item.id);
    const placeholder=orderItemIds.map(()=>'?').join(',');
    if (orderItemIds.length > 0) {
      // Delete from sale_items
      const deleteSaleItemsSQL = `DELETE FROM sale_items WHERE order_id IN (${placeholder})`;
      await pool.query(deleteSaleItemsSQL, [orderItemIds]);
    }

    // 2. Delete from order_items where product_id = ?
    const deleteOrderItemsSQL = `DELETE FROM order_items WHERE product_id = ?`;
    await pool.query(deleteOrderItemsSQL, [productId]);
    // 3. Delete from mpesa_request where product_id = ?
    const deleteMpesaRequestSQL = `DELETE FROM mpesa_request WHERE productId = ?`;
    await pool.query(deleteMpesaRequestSQL, [productId]);
    // 3. Delete from shoping_cart where product_id = ?
    const deleteShoppingCartSQL = `DELETE FROM shoping_cart WHERE product_id = ?`;
    await pool.query(deleteShoppingCartSQL, [productId]);

    // 4. Delete the product itself
    const deleteProductSQL = `DELETE FROM products WHERE products_id = ?`;
    const [deletes] = await pool.query(deleteProductSQL, [productId]);

    if (deletes.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(201).json({ message: "success" });
  } catch (error) {
    console.error("SQL error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

