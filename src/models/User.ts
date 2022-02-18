import { Schema, model, Document } from "mongoose";
import { validateEmail } from '../validation/UserFieldValidation';

export interface IUser extends Document {
    email: string;
    password: string;
};

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        validate: validateEmail(this)
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    const { password, ...rest } = obj;
    return rest;
};

const UserModel = model<IUser>('User', userSchema);

export default UserModel;