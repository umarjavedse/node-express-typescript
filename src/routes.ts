import { register, login } from "./controllers/authController";
import { getUser } from "./controllers/userController";
import { createTask, getTaskList } from "./controllers/taskController";

const routes = {
    noAuth: [
        {
            path: "/register",
            method: "post",
            action: register,
        },
        {
            path: "/login",
            method: "post",
            action: login,
        },
    ],
    auth: [
        {
            path: "/user",
            method: "get",
            action: getUser,
        },
        {
            path: "/create-task",
            method: "post",
            action: createTask,
        },
        {
            path: "/list-tasks",
            method: "get",
            action: getTaskList,
        },
    ],
};

export default routes;
