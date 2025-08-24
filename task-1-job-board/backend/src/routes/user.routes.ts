import express from "express";
import type { Request, Response } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import Application from "../models/application.model";
import Job from "../models/job.model";

const router = express.Router();

router.get("/", authMiddleware, (req: Request, res: Response) => {
    try {
        //@ts-ignore
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

//seeing job applicants
router.get(
    "/jobs/:id/applications",
    authMiddleware,
    requireRole("poster"),
    async (req: Request, res: Response) => {
        try {
            const jobId = req.params.id;

            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: "No such job found" });
            }

            const applicants = await Application.find({ job: jobId })
                .populate("applicant", "username email")
                .sort("-createdAt");

            res.json(applicants);
        } catch (error) {
            console.log("error getting applicants :: ");
            res.status(500).json({ message: "error getting applicants" });
        }
    }
);

router.get(
    "/applications",
    authMiddleware,
    requireRole("seeker"),
    async (req: Request, res: Response) => {
        try {
            //@ts-ignore
            const userId = req.user._id;
            const applications = await Application.find({
                applicant: userId,
            })
                .populate("job", "title description")
                .sort("-createdAt");

            res.json(applications);
            return;
        } catch (error) {
            console.log("Error getting Application ::", error);
            res.status(500).json({ message: error });
        }
    }
);

export default router;
