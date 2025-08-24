import jwt from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";
import User from "../models/user.model";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        if (!process.env.JWT_SECRET) {
            return res.json({ message: "Can't verify token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            userId: string;
        };
        const userId = decoded.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        //@ts-ignore
        req.user = user;

        next();
    } catch (error) {
        console.log("Error in middleware:: ", error);
        res.status(401).json({ message: "Invalid token" });
    }
};
