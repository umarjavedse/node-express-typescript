import { Schema, model } from "mongoose";

export interface ITask {
    name: string;
};

const taskSchema = new Schema<ITask>({
    name: {
        type: String,
        required: true,
    },
});

const TaskModel = model<ITask>('Task', taskSchema);

export default TaskModel;
