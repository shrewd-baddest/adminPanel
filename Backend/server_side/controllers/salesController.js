import pool from '../databse.js'
export const salesData=async(req,res)=>{
const sql=`SELECT * from users `
try{
const rows=await pool.query(sql);
res.status(200).json(rows.rows);
}
catch(error){
    res.status(400).json({message:error.message})
}

}