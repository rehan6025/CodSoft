import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAllJobs } from "../store/slices/jobsSlice";
import { LocationEdit, Search } from "lucide-react";

const JobsPage = () => {
    const dispatch = useAppDispatch();
    const { jobs, isLoading } = useAppSelector((state) => state.jobs);
    const [filters, setFilters] = useState({
        search: "",
        location: "",
        type: "",
    });

    useEffect(() => {
        dispatch(getAllJobs());
    }, [dispatch]);

    const jobTypes = [
        { value: "full-time", label: "Full time" },
        { value: "part-time", label: "Part time" },
        { value: "internship", label: "Internship" },
        { value: "freelance", label: "Freelance" },
    ];

    return (
        <div className="min-h-screen space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl">
                    Discover Your Next Oppurtunity
                </h1>
                <p className="">
                    Browse through {jobs.length} available positions from top
                    companies
                </p>
            </div>

            <div>
                <div className="flex space-x-2">
                    <Search />
                    <input type="text" placeholder="Search Jobs" />
                </div>
            </div>

            <div>
                <div className="flex space-x-2">
                    <LocationEdit />
                    <input type="Location" placeholder="Location" />
                </div>
            </div>

            <div>
                <div>
                    <select value={filters.type} id="selected-type">
                        {jobTypes.map((job) => (
                            <option value={job.value} key={job.value}>
                                {job.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
