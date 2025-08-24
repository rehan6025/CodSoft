import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./db/mongo.config";
import jobRouter from "./routes/job.routes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "hiii " });
});

app.use("/auth", authRouter);
app.use("/jobs", jobRouter);
app.use("/me", userRouter);

app.listen(3000, () => {
    connectDB();
    console.log("Server running on http://localhost:3000");
});
