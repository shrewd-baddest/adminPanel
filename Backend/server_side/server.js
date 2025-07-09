import express from 'express';
import dotenv from 'dotenv';
 import router from './Router/pages.js';
 dotenv.config();
import cors from 'cors'; 
import routes from './Router/Account.js';
const app = express();
const PORT = process.env.PORT ;

app.use(express.json());
app.use(cors());
app.use('/pages',router);
 app.use('/authority',routes);
 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

