import { Response } from "express";
import UserModel from "../models/User";
import ExtendedRequest from "../types/ExtendedRequest";

export const getUser = async (req: ExtendedRequest, res: Response): Promise<void | any> => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findOne({ _id: userId });
        res.send({ user });
    } catch (error) {
        res.send({ message: error.message });
    }
};
