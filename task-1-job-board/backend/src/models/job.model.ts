import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        company: {
            name: { type: String, required: true },
            website: { type: String },
        },
        employmentType: {
            type: String,
            enum: ["full-time", "part-time", "internship", "freelance"],
            required: true,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

jobSchema.index({
    title: "text",
    description: "text",
    "company.name": "text",
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
