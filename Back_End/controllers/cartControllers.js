import user from '../models/userModels.js';


const addToCart = async (req, res) => {
  const { userId, foodId, quantity } = req.body;

  try {
    const userData = await user.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingItem = userData.cart.find(item => item.foodId.toString() === foodId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      userData.cart.push({ foodId, quantity });
    }

    await userData.save();
    res.status(200).json({ message: 'Item added to cart', cart: userData.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
}

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const userData = await user.findById(userId).populate('cart.foodId');
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ cart: userData.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
}

const removeFromCart = async (req, res) => {
  const { userId, foodId } = req.body;

  try {
    const userData = await user.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    userData.cart = userData.cart.filter(item => item.foodId.toString() !== foodId);
    
    await userData.save();
    res.status(200).json({ message: 'Item removed from cart', cart: userData.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
}

export { addToCart, getCart, removeFromCart };