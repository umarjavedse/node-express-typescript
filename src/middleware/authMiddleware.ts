import { NextFunction, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

type Request = {
    headers: { authorization: string; };
    user: string | JwtPayload;
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed",
        });
    }
};

export default authMiddleware;