import React from "react";

import { FaAnglesRight } from "react-icons/fa6";
import BlogCart from "./BlogCart";

const LatestBlog = ({blogs}) => {
  
  return (
    <>
      <div>
        <div className="w-10/12 mx-auto mt-5 mb-5">
          <div>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-700">
                  Latest <span className="text-[#ff0000]">Blog</span>
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Stay updated with our latest news and insights. Explore our
                  blog for valuable information and tips.
                </p>
              </div>
              {/* <button className="text-md font-medium text-gray-400  text-left cursor-pointer">
                All Blogs
                <FaAnglesRight className="inline-block ml-2" />
              </button> */}
            </div>
          </div>
          <BlogCart blogs={blogs} />
        </div>
      </div>
    </>
  );
};

export default LatestBlog;
