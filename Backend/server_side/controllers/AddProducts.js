import pool from '../databse.js';

export const category=async(req,res)=>{
const sql=`select * from category`;
try {
    const [row]=await pool.query(sql)
    res.status(200).json(row);
} catch (error) {
   res.status(500).json({message:error.message});
}
}

export const supplierItems=async(req,res)=>{
if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }
    const imageUrl = req.file.path; 
const { weight,categoryId,stock,price,productName,supplierId}=req.body;
try {
    const sql1=`INSERT INTO supplier_items(supplier_id,category_id,weight_ml,price)
    VALUES(?,?,?,?)`;
    const [suppliedItems]=await pool.query(sql1,[supplierId,categoryId,weight,price]);
if (suppliedItems.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to insert into supplier_items" });
    }     
    
    const sql2=`SELECT supplier_item_id from supplier_items
        ORDER BY created_at DESC LIMIT 1`;
        const [supplied_id]=await pool.query(sql2)
        const id=supplied_id[0].supplier_item_id;
    
    const sql3=`INSERT INTO products(supplier_item_id,product_name, stock,image_url,weight_ml,price,category_id)
    VALUES(?,?,?,?,?,?,?)`;
    const [product]=await pool.query(sql3,[id,productName,stock,imageUrl,weight,price,categoryId]);
    if(product.affectedRows>0){
        res.status(201).json({message:'successfull'});
    }
    
} catch (error) {
    res.status(500).json({message:error.message});
}
}
export const supplierBills=async(req,res)=>{
const sql3=` SELECT 
      suppliers.supplier_id,
      SUM(supplier_items.stock * supplier_items.price) AS supplier_bill,
       suppliers.name AS supplier_names,
       suppliers.contact_info AS supplier_contacts
    FROM supplier_items
    JOIN suppliers ON suppliers.supplier_id = supplier_items.suplier_id
    WHERE supplier_items.created_at BETWEEN NOW() - INTERVAL 90 DAY AND NOW()
    GROUP BY supplier_items.suplier_id `
 try {
    const [billDetails]=await pool.query(sql3);
    res.status(200).json(billDetails)
 } catch (error) {
 res.status(400).send(error.message)
 }


}