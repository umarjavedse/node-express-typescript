import { Request, Response } from "express";
import TaskModel from "../models/Task";

export const createTask = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const task = await TaskModel.create({ name: req.body.name });
        res.send({ task });
    } catch (error) {
        res.send({ message: error.message });
    }
};


export const getTaskList = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const tasks = await TaskModel.find();
        res.send({ tasks });
    } catch (error) {
        res.send({ message: error.message });
    }
};
