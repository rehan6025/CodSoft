import express from "express";
import cors from "cors";
import { CreateUserSchema } from "./schema.js";
import { connectDB } from "./db/mongo.config";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.json({ message: "hiii " });
});
app.get("/signup", (req, res) => {
    const userData = CreateUserSchema.safeParse(req.body);
    if (!userData.success) {
        return res.json({ message: "incorret inputs" });
    }
    res.json({ message: "hiii " });
});
app.listen(3000, () => {
    connectDB();
    console.log("Server running on http://localhost:3000");
});
