import Router from 'express'
import login from '../controllers/LoginController.js';
import regist from '../controllers/RegistController.js';
import upload from '../middleware/multer.js';
import {  salesData} from '../controllers/salesController.js'
import verifyToken from '../middleware/tokens.js'

const routes=Router()
routes.post('/login',login);
routes.post('/regist',upload.single('image'),regist);
routes.get('/salesData', salesData)
 
export default routes