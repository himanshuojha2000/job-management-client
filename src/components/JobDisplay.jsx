import React, { useState, useEffect } from "react";
import job1 from "../assets/amazon.png";
import job2 from "../assets/swiggy.png";
import job3 from "../assets/tesla.jpg";
import clip1 from "../assets/clip1.png";
import clip2 from "../assets/clip2.png";
import clip3 from "../assets/clip3.png";

const JobDisplay = ({ filters }) => {
  const timeAgo = (postedTime) => {
    const now = new Date();
    const posted = new Date(postedTime);
    const diff = Math.floor((now - posted) / 1000); // difference in seconds

    if (diff < 60) return `${diff}s ago`; // seconds
    else if (diff < 3600) return `${Math.floor(diff / 60)}m ago`; // minutes
    else if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`; // hours
    else return `${Math.floor(diff / 86400)}d ago`; // days
  };
  const [jobs, setJobs] = useState([]);

  const filteredJobs = jobs.filter((job) => {
    const maxSalary = parseInt(job.salary_max.toString().replace(/,/g, ""), 10);

    // Convert to monthly salary
    const monthlySalary = maxSalary / 12;

    console.log({
      title: job.title,
      job_type: job.job_type,
      salary_max: job.salary_max,
    });
    return (
      job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      (filters.location === "" ||
        job.location.toLowerCase() === filters.location.toLowerCase()) &&
      (filters.jobType === "" || job.job_type === filters.jobType) &&
      (filters.salary === 0 || monthlySalary <= filters.salary) // 0 = show all
    );
  });
  const jobImage = [job1, job2, job3];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error Fetching jobs", err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-6  grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-2">
      {filteredJobs.map((job, index) => {
        const image = jobImage[index % jobImage.length];

        return (
          <div
            key={job.id}
            className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col  items-start w-[316px] h-[360px]"
            style={{ width: "316px", height: "360px" }}
          >
            {" "}
            {/* Posted time */}
            <div className="absolute top-3 right-3 bg-[#B0D9FF] text-black text-xs px-2 py-1 rounded-md">
              {timeAgo(job.posted_time)}
            </div>
            {/* Circular Image */}
            <div className="w-20 h-20 bg-gray-200 rounded-xl shadow flex items-center justify-center flex-shrink-0 mb-4">
              <div className="w-18 h-18 rounded-full overflow-hidden">
                <img
                  src={image}
                  alt="job"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Text */}
            <div className="flex flex-col justify-between flex-1 w-full h-full">
              <div>
                <h3 className="text-lg font-bold text-left">{job.title}</h3>

                {/* Info Row */}
                <div className="flex justify-around mb-5 text-[#555555] gap-4 mt-2 text-gray-500 ">
                  {/* Clipart 1 */}
                  <div className="flex items-center gap-1">
                    <img src={clip1} alt="experience" className="w-4 h-4" />
                    <span>1-3 yrs</span>
                  </div>

                  {/* Clipart 2 */}
                  <div className="flex items-center gap-1">
                    <img src={clip2} alt="onsite" className="w-4 h-4" />
                    <span>Onsite</span>
                  </div>

                  {/* Clipart 3 */}
                  <div className="flex items-center gap-1">
                    <img src={clip3} alt="salary" className="w-4 h-4" />
                    <span>{Math.floor(job.salary_max / 100000)} LPA</span>
                  </div>
                </div>

                <ul className="list-disc pl-5 text-[#555555] text-sm font-medium  break-words space-y-1">
                  {job.description.split("\n").map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Apply button at bottom */}
              <button className="w-full bg-[#00AAFF] text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Apply Now
              </button>
            </div>
          </div>
        );
      })}
    </div>

    // <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //   {jobs.map((job) => (
    //     <div
    //       key={job.id}
    //       className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
    //     >
    //       <img
    //         src=""
    //         alt="job"
    //         className="w-full h-40 object-cover rounded-md mb-3"
    //       />
    //       <h3 className="text-lg font-semibold">{job.title}</h3>
    //       <p className="text-gray-600">{job.company}</p>
    //       <p className="text-gray-500 text-sm">{job.location}</p>
    //       <p className="text-gray-700 text-sm mt-1">
    //         Salary: {job.salary_min} - {job.salary_max}
    //       </p>
    //       <p className="text-gray-500 text-xs mt-2">Deadline: {job.deadline}</p>
    //     </div>
    //   ))}
    // </div>
    //check
  );
};

export default JobDisplay;
