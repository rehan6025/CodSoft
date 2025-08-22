import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        resumeUrl: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["applied", "reviewing", "accepted", "rejected"],
            default: "applied",
        },
    },
    {
        timestamps: true,
    }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
