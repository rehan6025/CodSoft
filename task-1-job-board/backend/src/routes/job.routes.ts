import express from "express";
import type { Request, Response } from "express";
import Job from "../models/job.model";
import { JobSchema } from "../schema";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import Application from "../models/application.model";

const router = express.Router();

//everyone ,  get all jobs
router.get("/", async (req: Request, res: Response) => {
    try {
        const { type, location, search } = req.query;

        const filter: any = {};

        if (type) {
            filter.employmentType = type;
        }

        if (location) {
            filter.location = { $regex: new RegExp(location as string, "i") };
        }

        if (search) {
            filter.$text = { $search: search as string };
        }

        const jobs = await Job.find(filter)
            .populate("postedBy", "username email")
            .sort({ createdAt: -1 });

        res.json(jobs);
    } catch (error) {
        console.log("Error getting jobs ::", error);
        res.status(500).json({ messsage: error });
    }
});

//poster - creating job
router.post(
    "/",
    authMiddleware,
    requireRole("poster"),
    async (req: Request, res: Response) => {
        const userData = JobSchema.safeParse(req.body);
        console.log("333333333333333333333333333333333333333");
        if (!userData.success) {
            return res.status(400).json({ message: "Invalid inputs" });
        }

        try {
            const job = new Job(userData.data);
            await job.save();

            res.status(201).json(job);
        } catch (error) {
            console.log("error creating job post ", error);
            res.status(500).json({ message: "Error creating job post" });
        }
    }
);

//poster - deleting job
router.delete(
    "/:id",
    authMiddleware,
    requireRole("poster"),
    async (req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const job = await Job.findByIdAndDelete(id);
            res.status(201).json("Deleted Successfully");
        } catch (error) {
            console.log("Error deleting job::", error);
            res.status(500).json({ messsage: error });
        }
    }
);

//poster - getting all the jobs they posted
router.get(
    "/myJobs",
    authMiddleware,
    requireRole("poster"),
    async (req: Request, res: Response) => {
        const jobs = await Job.find({
            //@ts-ignore
            postedBy: req.user._id,
        });

        res.status(200).json(jobs);
    }
);

//seeker + poster , viewing a specific job
router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const job = await Job.findById(id).populate(
            "postedBy",
            "username email"
        );
        res.status(200).json(job);
    } catch (error) {
        console.log("Error getting job ::", error);
        res.status(500).json({ messsage: error });
    }
});

//seeker - applying for job here
router.post(
    "/:id/apply",
    authMiddleware,
    requireRole("seeker"),
    async (req: Request, res: Response) => {
        try {
            const jobId = req.params.id;
            const { resumeUrl } = req.body;

            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: "No such job found" });
            }

            const existingApp = await Application.findOne({
                job: job,
                //@ts-ignore
                applicant: req.user._id,
            });
            if (existingApp) {
                return res
                    .status(403)
                    .json({ message: "Already applied for this job" });
            }

            const application = await Application.create({
                job: job,
                //@ts-ignore
                applicant: req.user._id,
                resumeUrl,
            });

            res.status(201).json(application);
        } catch (error) {
            console.log("Error applying for job ::", error);
            res.status(500).json({ message: "error applying for job" });
        }
    }
);

export default router;
