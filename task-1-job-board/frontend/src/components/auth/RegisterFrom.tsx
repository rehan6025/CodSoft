import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "../../store/slices/authSlice";

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "seeker" | "poster";
};

const RegisterFrom = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "seeker",
    });
    const [showPass, setShowPass] = useState(false);
    const { isLoading, error, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/jobs");
        }
    }, [user, navigate]);

    useEffect(() => {
        dispatch(clearError());
    }, [formData, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 flex items-center justify-center p-4">
            <div className="relative max-w-md w-full">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <div className="text-center ">
                        <h2 className="font-bold text-3xl mt-6 text-gray-900">
                            Create your account
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="text-blue-600 font-medium hover:text-blue-500"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form className="space-y-6  p-8">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700 mb-3"
                            >
                                I am a
                            </label>
                            <div className="grid grid-cols-2 gap-3"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterFrom;
