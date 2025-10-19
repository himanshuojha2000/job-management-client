// modals/CreateJob.jsx
import React, { useState } from "react";
import arrow from "../assets/arrow.png";

const CreateJob = ({ onClose }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const handlePublish = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // corrected
        body: JSON.stringify({
          title: jobTitle,
          company: companyName,
          location,
          job_type: jobType,
          salary_min: salaryMin,
          salary_max: salaryMax,
          deadline,
          description: jobDesc,
        }),
      });

      if (!res.ok) throw new Error("Failed to publish job");

      const data = await res.json();
      console.log("Job published:", data);
      alert("✅ Job published successfully!");
      onClose(); // close modal after publishing
    } catch (err) {
      console.error("Error publishing job:", err);
      alert("❌ Failed to publish job");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-[900px] max-w-[800px] max-w-3px p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 w-full text-center">
            Create Job Opening
          </h2>
        </div>

        <div className="flex w-full gap-6 mb-4">
          <div className="flex-1">
            <label className="text-gray-700 font-medium pb-10 ">
              Job Title black
            </label>
            <input
              type="text"
              placeholder="Enter job title"
              className="w-full px-4 py-2 h-[60px] rounded-lg border border-gray-300 focus:border-black focus:text-gray-700 focus:outline-none"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            ></input>
          </div>

          <div className="flex-1">
            <label className=" text-gray-700 font-medium pb-1">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full px-4 py-2 rounded-lg h-[60px] border border-gray-300 focus:border-black focus:outline-none focus:text-black"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-6 mb-4 w-full">
          <div className="flex-1">
            <label className="text-gray-700 font-medium pb-1">Location</label>
            <select
              className="w-full px-4 py-2 rounded-lg h-[60px] border border-gray-300 focus:outline-none focus:border-black focus:text-gray-700"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Choose Preferred Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Kolkata">Kolkata</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-gray-700 font-medium pb-1">Job Type</label>
            <select
              className="w-full px-4 py-2 rounded-lg h-[60px] border border-gray-300 focus:outline-none focus:border-gray-700 focus:text-gray-700"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6 mb-4 w-full">
          <div className="flex-1">
            <label className="text-gray-700 font-medium pb-1">
              Salary Range
            </label>

            <div className="flex gap-2 mt-1 w-1/2">
              <input
                type="text"
                placeholder="⇅ 0"
                className="px-4 py-2 rounded-lg h-[60px] border border-gray-300 focus:border-black focus:outline-none focus:text-black"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
              ></input>
              <input
                type="text"
                placeholder="⇅ 12,00,000"
                className="px-4 py-2 rounded-lg h-[60px] border border-gray-300 focus:border-black focus:outline-none focus:text-black"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex-1">
            <label className="text-gray-700 font-medium pb-1">
              Application Deadline
            </label>
            <input
              placeholder="none"
              type="date"
              className=" w-full px-4 py-2 rounded-lg h-[60px] border border-gray-300 focus:border-black focus:outline-none focus:text-black mt-1 appearance-none "
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col w-full mt-4">
          <label className="text-gray-700 font-medium pb-1">
            Job Description
          </label>
          <textarea
            placeholder="Please share description to let the candidate know more about this job role"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none focus-text-black min-h-[170px] "
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-between w-full gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-[230px] flex items-center  justify-center gap-2 px-6 py-3 border border-black rounded-lg text-black transition-all"
          >
            Save Draft
            <img src={arrow} alt="arrow" className="w-4 h-4"></img>
          </button>
          <button
            onClick={handlePublish}
            className="w-[207px] flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white transition-all  bg-[#00AAFF] hover:bg-[#0095E0]"
          >
            Publish
            <img
              src={arrow}
              alt="arrow"
              className="w-4 h-4 -rotate-90 filter invert"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
