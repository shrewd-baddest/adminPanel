import multer from 'multer';
import {storage} from '../controllers/Cloudinary.js';
const upload = multer({ storage: storage });
export default upload;