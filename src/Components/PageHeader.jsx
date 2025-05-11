import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PageHeader = ({ page }) => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center px-6 py-4 border border-gray-300 rounded-b-md">
          <div>
            <h3 className="text-base text-gray-600 font-semibold">
              {page} Page
            </h3>
          </div>
          <div>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <Link to="/" className=" cursor-pointer">
                Home
              </Link>
              <FaChevronRight className="text-[#ff0000]" />
              <span className="text-[#ff0000] flex items-center gap-2 cursor-pointer">
                {page} Page
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
