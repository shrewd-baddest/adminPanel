import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
      api_key:process.env.CLOUDINARY_API_KEY,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        // folder: 'yogoblast',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
    });
    export {storage,cloudinary}