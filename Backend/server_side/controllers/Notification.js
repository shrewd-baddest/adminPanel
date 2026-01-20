import pool from '../databse.js'

export const getNotifications = async(req, res) => {
    const q = "SELECT * FROM notifications";
    try {
        const data = await pool.query(q);
        const now = new Date().toISOString().split("T")[0];
        data.rows.map(item => {
            const itemDate = new Date(item.created_at).toISOString().split("T")[0];
            if (itemDate === now) {
                item.created_at = new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
          else {
                item.created_at = new Date(item.created_at).toISOString().split("T")[0];
            }
            return item;
        });
        
       return res.status(200).json(data.rows);
    } catch (error) {
        console.error("Error fetching notifications:", error.message);
        return res.status(500).json({ error:error.message });        
    }
}