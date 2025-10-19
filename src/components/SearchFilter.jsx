import React from "react";
import { FiSearch } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
const SearchFilter = ({ filters, setFilters }) => {
  const [salary, setSalary] = useState(0);
  const getSalaryRangeLabel = (value) => {
    if (value === 0) return "All"; // <-- shows all jobs initially
    if (value === 30000) return "₹30k - ₹60k";
    if (value === 60000) return "₹60k - ₹90k";
    if (value === 90000) return "₹90k - ₹120k";
    else return "₹120k +";
  };

  const handleChange = (e) => {
    let value = parseInt(e.target.value);
    value = Math.round(value / 30000) * 30000;
    setSalary(value);
    setFilters({ ...filters, salary: value });
  };

  return (
    <div className="w-full  px-1 flex justify-between gap-0 max-w-7xl mx-auto mt-6 items-center mr-20 ">
      <div className="flex-1 px-4 py-2 border-r border-gray-400 relative flex  items-center justify-between mr-5">
        <FiSearch className="absolute left-0 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search by Job, Title, Role"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
          className="rounded-lg px-4 py-2 flex-1 min-w-200[px] placeholder-gray-500 focus:outline-none "
        />
      </div>
      <div className="flex-1 px-4 py-2 border-r border-gray-400 text-gray-500  relative flex  items-center justify-between mr-5">
        <FiMapPin className="left-4 text-gray-500 text-xl" />
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full rounded px-4 py-2 focus:outline-none"
        >
          <option value="">Preferred Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>

          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
        </select>
      </div>
      <div className="flex-1 px-4 py-2 border-r border-gray-400 relative flex text-gray-500  items-center justify-between mr-5">
        {/* Job Type */}
        <FiUser className="absolute left-4 text-gray-500 text-xl" />
        <select
          value={filters.jobType}
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          className="rounded-lg px-4 py-2 flex-1 focus:outline-none ml-4"
        >
          <option value="">Job Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="flex-1 px-4 py-2">
        {/* Salary per Month */}
        <div className="flex justify-between mb-2 text-sm ">
          <span className="text-black mb-2 text-base font-extrabold">
            Salary per month
          </span>
          <span>{getSalaryRangeLabel(salary)}</span>
        </div>

        <div className="relative flex items-center">
          <span className="absolute left-0 w-4 h-4 bg-black rounded-full"></span>
          <input
            type="range"
            min="0"
            max="120000"
            step="1000"
            value={salary}
            onChange={handleChange}
            className="w-full pl-6 h-0.5 bg-gray-200 rounded-lg accent-black"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
