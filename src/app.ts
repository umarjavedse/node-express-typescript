import * as express from "express";
import { connect, set } from "mongoose";
import routes from "./routes";
import authMiddleware from "./middleware/authMiddleware";

const app = express();

connect(process.env.MONGODB_URI, { autoIndex: true });
set("debug", true);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    return next();
});

routes.noAuth.forEach((route) => {
    app[route.method](route.path, route.action);
});

routes.auth.forEach((route) => {
    app[route.method](route.path, authMiddleware, route.action);
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    next(error);
});

type Error = {
    status: number;
    message: string;
};

app.use((error: Error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

export default app;
