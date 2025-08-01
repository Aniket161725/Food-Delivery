import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        // minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    }],
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;