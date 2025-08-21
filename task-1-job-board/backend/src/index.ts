import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { CreateUserSchema, SigninSchema } from "./schema";
import { connectDB } from "./db/mongo.config";
import User from "./models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "hiii " });
});

app.post("/signup", async (req: Request, res: Response) => {
    const userData = CreateUserSchema.safeParse(req.body);
    if (!userData.success) {
        return res.json({ message: "incorret inputs" });
    }

    try {
        const checkExists = await User.findOne({
            email: userData.data.email,
        });

        if (checkExists) return res.json({ message: "Invalid credentials" });

        const hashPw = await bcrypt.hash(userData.data.password, 10);

        const user = await User.create({
            username: userData.data.username,
            email: userData.data.email,
            password: hashPw,
        });

        const key = process.env.JWT_SECRET;
        if (!key)
            return res.status(500).json({ message: "invalid jwt secret" });
        const token = jwt.sign(
            {
                userId: user?._id,
            },
            key
        );

        res.status(200).json({
            token,
        });
    } catch (error) {
        console.log("Error registoring user :", error);
    }
});

app.post("/signin", async (req: Request, res: Response) => {
    const userData = SigninSchema.safeParse(req.body);
    if (!userData.success) {
        res.json({
            message: "Incorrect inputs",
        });
        return;
    }

    try {
        const user = await User.findOne({
            email: userData.data.email,
        });

        if (!user) {
            return res.status(403).json({
                message: "Invalid credentials",
            });
        } else {
            const passMatch = await bcrypt.compare(
                userData.data.password,
                user.password
            );

            if (!passMatch) {
                return res.status(403).json({ message: "Invalid credentials" });
            }
        }

        const key = process.env.JWT_SECRET;
        if (!key)
            return res.status(500).json({ message: "invalid jwt secret" });
        const token = jwt.sign(
            {
                userId: user?._id,
            },
            key
        );

        res.status(200).json({
            token,
        });
    } catch (error) {
        console.log("Error signing in: ", error);
    }
});

app.listen(3000, () => {
    connectDB();
    console.log("Server running on http://localhost:3000");
});
