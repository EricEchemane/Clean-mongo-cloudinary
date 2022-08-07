import mongoose from "mongoose";
import Hasher from "utils/hasher";
import { isValidEmail } from "utils/validators";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: isValidEmail,
            message: 'Invalid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters']
    }
});

userSchema.pre('save', function (next) {
    this.password = Hasher.hash(this.password);
    next();
});

const User = mongoose.model("User", userSchema);

export default User;