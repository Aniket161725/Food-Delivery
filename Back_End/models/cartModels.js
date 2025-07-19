import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    }
}, {
    timestamps: true,
});