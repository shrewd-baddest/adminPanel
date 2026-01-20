import pool from '../databse.js';

export const category=async(req,res)=>{
const sql=`select * from category`;
try {
    const {rows}=await pool.query(sql)
    res.status(200).json(rows);
} catch (error) {
   res.status(500).json({message:error.message});
}
}

export const supplierItems = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const imageUrl = req.file.path;
  const { weight, categoryId, stock, price, productName, supplierId } = req.body;

  try {
    await pool.query("BEGIN");

    const insertSupplierItem = `
      INSERT INTO supplier_items
      (suplier_id, category_id, weight_ml, price)
      VALUES ($1, $2, $3, $4)
      RETURNING supplier_item_id
    `;

    const supplierItemResult = await pool.query(insertSupplierItem, [
      supplierId,
      categoryId,
      weight,
      price,
    ]);

    const supplierItemId = supplierItemResult.rows[0].supplier_item_id;

    const insertProduct = `
      INSERT INTO products
      (supplier_item_id, products_name, stock, image_url, weight_ml, price, category_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    await pool.query(insertProduct, [
      supplierItemId,
      productName,
      stock,
      imageUrl,
      weight,
      price,
      categoryId,
    ]);

    await pool.query("COMMIT");

    res.status(201).json({ message: "Successful" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const supplierBills=async(req,res)=>{
const sql3=` SELECT 
      suppliers.supplier_id,
      SUM(supplier_items.stock * supplier_items.price) AS supplier_bill,
       suppliers.name AS supplier_names,
       suppliers.contact_info AS supplier_contacts
    FROM supplier_items
    JOIN suppliers ON suppliers.supplier_id = supplier_items.suplier_id
    WHERE supplier_items.created_at BETWEEN NOW() - INTERVAL '90 days' AND NOW()
    GROUP BY supplier_items.suplier_id `
 try {
    const billDetails=await pool.query(sql3);
    res.status(200).json(billDetails.rows)
 } catch (error) {
 res.status(400).send(error.message)
 }


}