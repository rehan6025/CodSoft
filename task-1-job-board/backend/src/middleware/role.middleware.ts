import type { Response, Request, NextFunction } from "express";

export const requireRole = (role: String) => {
    return (req: Request, res: Response, next: NextFunction) => {
        //@ts-ignore
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access is denied" });
        }
    };
};
