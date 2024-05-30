import React from "react";
import { FaSearch } from "react-icons/fa";

export const HeaderAdmin = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center px-16 py-5 bg-[#EBF3FC] z-50">
      <div className="text-2xl font-bold text-primary">Hi, Admin!</div>
      {/* <div className="flex items-center relative">
        <input
          type="text"
          placeholder="Cari"
          className="w-[300px] rounded-lg py-4 px-6 text-sm border-none outline-primary"
        />
        <div className="absolute right-4 bg-primary text-white rounded-lg p-2 cursor-pointer">
          <FaSearch />
        </div>
      </div> */}
    </div>
  );
};
