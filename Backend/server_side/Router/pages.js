import { Router } from 'express';
const router = Router();
import upload from '../middleware/multer.js';
import { supplierBills, supplierItems } from '../controllers/AddProducts.js';
import {productDetails,Deletion} from '../controllers/InventoryController.js';
import { order, customers, delivery ,chartTable,sales,MostSold} from '../controllers/HomeControllers.js';
import verifyToken from '../middleware/tokens.js';
import { category } from '../controllers/AddProducts.js';
import {staffNumber} from '../controllers/Staff.js'
import { searchProduct } from '../controllers/Search.js';
import {revenue} from '../controllers/Report.js'
import {salesReport,salesTrends,productTypes} from '../controllers/Report.js'
import { getSettings } from '../controllers/SettingsController.js';
import { getNotifications } from '../controllers/Notification.js';
import { customersDetails } from '../controllers/Customers.js';
router.get('/orders',verifyToken, order);
router.get('/customers',verifyToken, customers);
router.get('/delivery',verifyToken,delivery);
 router.get('/chart-data', chartTable);
router.get('/sales',verifyToken,sales);
router.get('/MostSold',verifyToken,MostSold);
router.get('/productDetails',verifyToken,productDetails);
router.post('/deleteProduct',Deletion);
router.get('/category',verifyToken,category);
router.get('/staffDetails',staffNumber)
router.get('/supplierBills',supplierBills)
router.post('/supplierItems',verifyToken,upload.single('image'),supplierItems);
router.post('/search',verifyToken,searchProduct)
router.get('/revenue', revenue)
router.get('/salesReport',salesReport)
router.get('/salesTrends',salesTrends);
router.get('/productTypes',productTypes);
router.get('/profile',verifyToken,getSettings);
router.get('/notifications',getNotifications);
router.get('/customersDetails',customersDetails);
export default router;
