import { Request } from "express";
import { IUser } from "../models/User";

export default interface ExtendedRequest extends Request {
    user?: IUser;
}