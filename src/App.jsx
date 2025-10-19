import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchFilter from "./components/SearchFilter";
import CreateJob from "./modals/CreateJob";
import JobDisplay from "./components/JobDisplay";

const App = () => {
  const [showCreateJob, setShowCreateJob] = useState(false);

  // Central filter state shared by SearchFilter and JobDisplay
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    jobType: "",
    salary: 0,
  });

  return (
    <div className="w-full h-screen w-[1200px] min-w-[1200px] mx-auto flex flex-col">
      {/* Navbar and Filter */}
      <div className="flex flex-col">
        <Navbar onCreate={() => setShowCreateJob(true)} />
        {/* ✅ Pass filters and setFilters */}
        <SearchFilter filters={filters} setFilters={setFilters} />
      </div>

      {/* Job Display with filters applied */}
      <div className="w-full bg-gray-100 flex-1 overflow-y-auto mt-4">
        <JobDisplay filters={filters} />
      </div>

      {/* Modal */}
      {showCreateJob && <CreateJob onClose={() => setShowCreateJob(false)} />}
    </div>
  );
};

export default App;
