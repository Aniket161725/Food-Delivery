import user from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import dotenv from 'dotenv';
dotenv.config();


const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // Check if user exists
        const existingUser = await user.findOne({
            email
        });
        if (!existingUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const registerUser = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Check if email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            });
        }

        // Check if user already exists
        const existingUser = await user.findOne({
            email
        });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        if (!salt) {
            return res.status(500).json({
                message: 'Error generating salt for password hashing'
            });
        }
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
export {
    loginUser,
    registerUser
};