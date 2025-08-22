import * as z from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.email().min(6).max(30),
    password: z.string().min(6).max(30),
});

export const SigninSchema = z.object({
    email: z.string().min(6).max(30),
    password: z.string().min(6).max(30),
});

export const JobSchema = z.object({
    title: z.string().min(1, "Title is required").trim(),
    location: z.string().min(1),
    description: z.string().min(1),
    company: z.object({
        name: z.string().min(1),
        website: z.string().url().optional(),
    }),
    employmentType: z.enum([
        "full-time",
        "part-time",
        "internship",
        "freelance",
    ]),
    postedBy: z.string().min(1),
});
