import React from "react";
import Logo from "../assets/logo.png";

const Navbar = ({ onCreate }) => {
  return (
    <nav className=" pt-4 pb-4 max-h-[100px] py-6">
      <div className="max-w-[900px]  w-full h-[70px] mx-auto rounded-[122px] shadow-[0_0_20px_0_rgba(127,127,127,0.3)]  flex items-center justify-between mt-21px px-6">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="max-h-[44px] h-10 w-10 object-contain"
          />
        </div>

        <ul className="flex space-x-8 text-[#303030] text-m  font-medium list-none ">
          <li className="cursor-pointer px-3 py-1 rounded-md hover:shadow-md hover:translate-y-1 transition transform">
            Home
          </li>
          <li className="cursor-pointer px-3 py-1 rounded-md hover:shadow-md hover:translate-y-1 transition transform">
            Find Jobs
          </li>
          <li className="cursor-pointer px-3 py-1 rounded-md hover:shadow-md hover:translate-y-1 transition transform">
            Find Talents
          </li>
          <li className="cursor-pointer px-3 py-1 rounded-md hover:shadow-md hover:translate-y-1 transition transform">
            About Us
          </li>
          <li className="cursor-pointer px-3 py-1 rounded-md hover:shadow-md hover:translate-y-1 transition transform">
            Testimonials
          </li>
        </ul>

        <div>
          <button
            onClick={onCreate}
            className="cursor-pointer relative w-[150px] h-[44px] px-[24px] py-[8px] rounded-[30px] text-white text-sm bg-gradient-to-b from-[#A128FF] to-[#6100AD] shadow-md font-extrabold overflow-hidden group"
          >
            {/* Default text */}
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-y-full">
              Create Jobs
            </span>
            {/* Hover text */}
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
              Add Job +
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
