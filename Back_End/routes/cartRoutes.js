import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartControllers.js";
const router = Router();
import authMiddleware from "../middlewares/auth.js";

router.post('/add',authMiddleware, addToCart);
router.get('/:userId',authMiddleware, getCart);   
router.delete('/remove',authMiddleware, removeFromCart);
export default router;