import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js'; 

import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware 

app.use(express.json());      
app.use(cors());  
app.use(express.urlencoded({ extended: true }));

connectDB(); // Connect to MongoDB

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);
app.use('/uploads', express.static('uploads')); 

app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
console.log(`Database connected successfully`);