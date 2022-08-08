import mongoose from "mongoose";
import Hasher from "utils/hasher";
import { isValidEmail } from "utils/validators";

export interface IUserSchema {
    email: string;
    password: string;
}
export interface IUserModel extends IUserSchema, mongoose.Document {
    email: string;
    password: string;
    validPassword(password: string): boolean;
}

const userSchema = new mongoose.Schema<IUserSchema>({
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

userSchema.methods.validPassword = function (password: string) {
    return Hasher.verify(password, this.password);
};

userSchema.pre('save', function (next) {
    this.password = Hasher.hash(this.password);
    next();
});

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;