import { Router } from 'express';
const router = Router();

import { order, customers, delivery ,chartTable,sales,MostSold} from '../controllers/HomeControllers.js';
import verifyToken from '../middleware/tokens.js';

router.get('/orders',verifyToken, order);
router.get('/customers',verifyToken, customers);
router.get('/delivery',verifyToken, delivery);
router.get('/chart-data',chartTable);
router.get('/sales',sales);
router.get('/MostSold',MostSold);
export default router;
