import pool from '../databse.js'

export const searchProduct=async(req,res)=>{
    const {query}=req.body
let sql =`SELECT * FROM products WHERE product_name LIKE $1 OR weight_ml=$2 OR price=$3`;
const parsedNumber = isNaN(parseFloat(query)) ? null : parseFloat(query);
 
try {
    const placeholder =`%${query}%`;
    const search=await pool.query(sql,[placeholder,parsedNumber,parsedNumber]); 
    res.status(201).json(search.rows);
} catch (error) {
    res.status(400).json({message:error.message});
}
}