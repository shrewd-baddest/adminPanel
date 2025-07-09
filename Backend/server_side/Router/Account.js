import Router from 'express'
import login from '../controllers/LoginController.js';
import regist from '../controllers/RegistController.js';

const routes=Router()
routes.post('/login',login);
routes.post('/regist',regist);
routes.get('/login',(req,res)=>{
    res.send('welcome');
})
export default routes