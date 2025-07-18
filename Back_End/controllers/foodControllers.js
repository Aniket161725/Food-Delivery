import Food from "../models/foodModels.js";
import fs from "fs";

const addFood = async (req, res) => {   
    try {

        if (req.file && req.file.filename) {
            image = req.file.filename;
        } else {
            return res.status(400).json({ message: "Image file is required" });
        }

        if (!req.body.name || !req.body.description || !req.body.price || !image || !req.body.category) {

        return res.status(400).json({ message: "All fields are required" });
        }

    
        
        const newFood = new Food({
        name:req.body.name ,
        description: req.body.description,
        price  : req.body.price,
        image:image,
        category: req.body.category,
        available: req.body.available
        });
    
        await newFood.save();
        res.status(201).json({ message: "Food item added successfully", food: newFood });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ message: "Server error" });
    }
    }

const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find().populate('reviews');
        res.status(200).json(foods);
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id).populate('reviews');
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json(food);
    } catch (error) {
        console.error("Error fetching food by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const updateFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const food = await Food.findById(req.params.id);
        
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }

        if (req.file) {
            // Delete old image if it exists
            if (food.image) {
                fs.unlinkSync(food.image);
            }
            food.image = req.file.path;
        }

        food.name = name || food.name;
        food.description = description || food.description;
        food.price = price || food.price;
        food.category = category || food.category;

        await food.save();
        res.status(200).json({ message: "Food item updated successfully", food });
    } catch (error) {
        console.error("Error updating food:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Delete image file if it exists
        if (food.image) {
            fs.unlinkSync(food.image);
        }

        await food.remove();
        res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { addFood, getAllFoods, getFoodById, updateFood, deleteFood };
