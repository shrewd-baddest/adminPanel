import pool from '../databse.js'

export const productDetails=async(req,res)=>{
    const sql=`SELECT * FROM products`
    try{
        const products=await pool.query(sql);
        res.status(200).json(products.rows);

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
    const getOrderItemsSQL = `SELECT id FROM order_items WHERE product_id = $1`;
    const orderItems = await pool.query(getOrderItemsSQL, [productId]);

    const orderItemIds = orderItems.rows.map(item => item.id);
    const placeholder=orderItemIds.map((_, i)=>`$${i + 1}`).join(',');
    if (orderItemIds.length > 0) {
      // Delete from sale_items
      const deleteSaleItemsSQL = `DELETE FROM sale_items WHERE order_id IN (${placeholder})`;
      await pool.query(deleteSaleItemsSQL, orderItemIds);
    }

    // 2. Delete from order_items where product_id = $1
    const deleteOrderItemsSQL = `DELETE FROM order_items WHERE product_id = $1`;
    await pool.query(deleteOrderItemsSQL, [productId]);
    // 3. Delete from mpesa_request where product_id = $1
    const deleteMpesaRequestSQL = `DELETE FROM mpesa_request WHERE productId = $1`;
    await pool.query(deleteMpesaRequestSQL, [productId]);
    // 3. Delete from shoping_cart where product_id = $1
    const deleteShoppingCartSQL = `DELETE FROM shoping_cart WHERE product_id = $1`;
    await pool.query(deleteShoppingCartSQL, [productId]);

    // 4. Delete the product itself
    const deleteProductSQL = `DELETE FROM products WHERE products_id = $1`;
    const deletes = await pool.query(deleteProductSQL, [productId]);

    if (deletes.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(201).json({ message: "success" });
  } catch (error) {
    console.error("SQL error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

