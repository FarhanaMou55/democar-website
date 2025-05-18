import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BlogCart = ({ blogs }) => {
  return (
  
      <div className="w-10/12 mx-auto mt-5 mb-5">
          
            
              <div>
                <h2 className="text-2xl font-bold text-gray-700">
                  Latest <span className="text-[#ff0000]">Blog</span>
                </h2>
                <p className="text-sm text-gray-500 mt-2 mb-4">
                  Stay updated with our latest news and insights. Explore our
                  blog for valuable information and tips.
                </p>
              </div>
          
          
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-lg hover:shadow-2xl border border-gray-200"
          >
            <Link to={`/blog/${blog.id}`}>
              <div className="p-4 h-56">
                <img
                  src={blog.image} // ✅ Use direct image link from JSON
                  alt={blog.title}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
              </div>
              <div className="p-6 pt-2 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                  <span>{blog.date}</span>
                  <div className="w-1 h-[2px] bg-gray-600"></div>
                  <p>{blog.category}</p>
                </div>
                <h1 className="text-lg font-semibold text-gray-700 truncate">
                  {blog.title}
                </h1>
                <button className="text-sm font-medium text-[#ff0000] text-left cursor-pointer">
                  Read More
                  <FaAnglesRight className="inline-block ml-2" />
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCart;
