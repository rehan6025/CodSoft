import { useState } from "react";

type FormData = {
    title: string;
    location: string;
    description: string;
    company: {
        name: string;
        website: string;
    };
    employmentType: "full-time" | "part-time" | "freelance" | "internship";
};

const PostJobPage = () => {
    const [formData, setFormData] = useState<FormData>();

    return (
        <div className="min-h-screen">
            <div className=" shadow-xl rounded-lg max-w-4xl bg-white/70 mx-auto p-4">
                <h2 className="text-5xl mb-8  mt-4  bg-gradient-to-r from-blue-500 to-purple-500  text-transparent bg-clip-text font-bold text-center">
                    Post A New Job
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="font-medium text-sm text-gray-700 "
                    >
                        Job Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Ex. Software Engineer"
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="font-medium text-sm text-gray-700 "
                    >
                        Company name
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter company's name"
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="font-medium text-sm text-gray-700 "
                    >
                        Company website
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter company's website"
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="font-medium text-sm text-gray-700 "
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Ex. Delhi, India"
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="font-medium text-sm text-gray-700 "
                    >
                        Description
                    </label>
                    <textarea
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent h-26"
                        placeholder="Enter description..."
                    />
                </div>
            </div>
        </div>
    );
};

export default PostJobPage;
