import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Applications = {
    id: string;
    job: string;
    applicant: string;
    resumeUrl: string;
    status: "applied" | "reviewing" | "accepted" | "rejected";
    createdAt: string;
    updatedAt: string;
};

interface ApplicationsState {
    userApplications: Applications[];
    jobApplications: Applications[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ApplicationsState = {
    userApplications: [],
    jobApplications: [],
    isLoading: false,
    error: null,
};

export const applyToJobs = createAsyncThunk(
    "/applications/applyToJob",
    async ({ jobId, data }: { jobId: string; data: { resumeUrl: string } }) => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/jobs/${jobId}/apply`,
            { data }
        );

        return res.data;
    }
);

export const getUserApplications = createAsyncThunk(
    "/applications/getUserApplications",
    async () => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/me/applications`
        );

        return res.data;
    }
);

export const getJobApplications = createAsyncThunk(
    "/applications/getJobApplications",
    async (jobId: string) => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/jobs/${jobId}/applications`
        );
        return res.data;
    }
);

export const updateApplicationStatus = createAsyncThunk(
    "/applications/updateApplicationStatus",
    async ({
        applicationId,
        status,
    }: {
        applicationId: string;
        status: string;
    }) => {
        const res = await axios.patch(
            `${
                import.meta.env.VITE_API_URL
            }/applications/${applicationId}/status`,
            { data: status }
        );
        return res.data;
    }
);

const applicationSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyToJobs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(applyToJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userApplications.push(action.payload);
            })
            .addCase(applyToJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Error applying to job";
            });

        builder
            .addCase(getUserApplications.fulfilled, (state, action) => {
                state.userApplications = action.payload;
            })

            .addCase(getJobApplications.fulfilled, (state, action) => {
                state.jobApplications = action.payload;
            })

            .addCase(updateApplicationStatus.fulfilled, (state, action) => {
                const index = state.jobApplications.findIndex(
                    (app) => app.id === action.payload.id
                );
                if (index !== -1) {
                    state.jobApplications[index] = action.payload;
                }
            });
    },
});

export const { clearError } = applicationSlice.actions;
export default applicationSlice.reducer;
