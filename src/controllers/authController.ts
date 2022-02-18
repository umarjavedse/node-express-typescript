import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import UserModel from "../models/User";

export const register = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const email = req.body.email;
        const password = hashSync(req.body.password, 10);
        const user = await UserModel.create({ email, password });
        res.send({ user });
    } catch (error) {
        res.send({ message: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const user = await UserModel.findOne({ email });
        if (user && compareSync(password, user.password)) {
            const jwt = authToken(user);
            res.send({ jwt });
        }
        else {
            res.send({ message: 'Authentication Failed' });
        }
    } catch (error) {
        res.send({ message: error.message });
    }
};

const authToken = (user) => {
    return sign(
        {
            email: user.email,
            _id: user._id,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.TOKEN_EXPIRY_TIME
        }
    );
};