import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
    isLoading: false,
    error: null as string | null,
};

export interface User {
    id: string;
    username: string;
    email: string;
    role: "poster" | "seeker";
}

export const register = createAsyncThunk(
    "auth/register",
    async (data: {
        username: string;
        email: string;
        password: string;
        role: "poster" | "seeker";
    }) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/register`,
            data
        );
        localStorage.setItem("token", response.data.token);
        return response.data;
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data: { email: string; password: string }) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            data
        );
        localStorage.setItem("token", response.data.token);
        return response.data;
    }
);

export const getProfile = createAsyncThunk("auth/getProfile", async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`);
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Registration failed";
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Login failed";
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export default authSlice.reducer;
export const { logout, clearError } = authSlice.actions;
