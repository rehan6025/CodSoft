import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Job = {
    id: string;
    title: string;
    location: string;
    description: string;
    company: {
        name: string;
        website?: string;
    };
    employmentType: "full-time" | "part-time" | "internship" | "freelance";
    postedBy: string;
    createdAt?: string;
    updatedAt?: string;
};

interface JobsState {
    jobs: Job[];
    currentJob: Job | null;
    userJobs: Job[];
    isLoading: boolean;
    error: string | null;
}

const initialState: JobsState = {
    jobs: [],
    currentJob: null,
    userJobs: [],
    isLoading: false,
    error: null,
};

// Get All Jobs
export const getAllJobs = createAsyncThunk(
    "jobs/getAllJobs",
    async (params?: { search?: string; location?: string; type?: string }) => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`, {
            params,
        });
        return res.data as Job[];
    }
);

// Get Job By ID
export const getJobById = createAsyncThunk(
    "jobs/getJobById",
    async (id: string) => {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/jobs/${id}`
        );
        return res.data as Job;
    }
);

// Create Job
export const createJob = createAsyncThunk(
    "jobs/createJob",
    async (data: Omit<Job, "id" | "createdAt" | "updatedAt">) => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/jobs`,
            data
        );
        return res.data as Job;
    }
);

// Delete Job
export const deleteJob = createAsyncThunk(
    "jobs/deleteJob",
    async (id: string) => {
        await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`);
        return id;
    }
);

// Get User Jobs
export const getUserJobs = createAsyncThunk("jobs/getUserJobs", async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/myJobs`);
    return res.data as Job[];
});

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        clearCurrentJob: (state) => {
            state.currentJob = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers(builder) {
        builder
            // Get All Jobs
            .addCase(getAllJobs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = action.payload;
            })
            .addCase(getAllJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch jobs";
            })

            // Get Job By ID
            .addCase(getJobById.fulfilled, (state, action) => {
                state.currentJob = action.payload;
            })

            // Create Job
            .addCase(createJob.fulfilled, (state, action) => {
                state.userJobs.push(action.payload);
                state.jobs.push(action.payload);
            })

            // Delete Job
            .addCase(deleteJob.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.jobs = state.jobs.filter((job) => job.id !== deletedId);
                state.userJobs = state.userJobs.filter(
                    (job) => job.id !== deletedId
                );

                if (state.currentJob?.id === deletedId) {
                    state.currentJob = null;
                }
            })

            // Get User Jobs
            .addCase(getUserJobs.fulfilled, (state, action) => {
                state.userJobs = action.payload;
            });
    },
});

export const { clearCurrentJob, clearError } = jobsSlice.actions;
export default jobsSlice.reducer;
