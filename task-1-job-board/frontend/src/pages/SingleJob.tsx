import { useParams } from "react-router-dom";
import { getJobById } from "../store/slices/jobsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";

const SingleJob = () => {
    const { jobid } = useParams();
    if (!jobid) {
        return <div>No job found</div>;
    }
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getJobById(jobid!));
    }, []);

    const { currentJob } = useAppSelector((state) => state.jobs);
    console.log(currentJob);

    return (
        <div className="flex">
            <div className="w-10 h-10 bg-red-100">
                <div>
                    <div className=" w-2  h-2 bg-red-400"></div>
                    <div className="mt-3 w-2  h-2 bg-red-400"></div>
                </div>
            </div>
            <div className="ml-5 w-10 h-10 bg-red-400"></div>
        </div>
    );
};

export default SingleJob;
