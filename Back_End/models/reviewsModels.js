import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        date: {
            type: Date,
            default: Date.now
        },
}, {
    timestamps: true        
}); 

const Review = mongoose.model('Review', reviewSchema);
export default Review;
    