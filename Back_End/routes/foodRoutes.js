import { Router } from 'express';

import { getAllFoods, addFood, updateFood, deleteFood , getFoodById } from '../controllers/foodControllers.js';
// import { upload } from '../middleware/upload.js';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.route('/add') 
    .post(upload.single('image'), addFood);

router.route('/')
    .get(getAllFoods);


router.route('/:id')
    .get(getFoodById)   
    .put(upload.single('image'), updateFood)
    .delete(deleteFood);

export default router;