import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Briefcase className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">
                            JobBoard
                        </span>
                    </Link>

                    <div className="flex justify-center space-x-6 items-center">
                        <div>Login</div>
                        <div>Register</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
