import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import jobsSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        jobs: jobsSlice,
        applications: applicationsSlice,
    },
});
