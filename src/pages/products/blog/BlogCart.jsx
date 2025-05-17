import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Manually import images
import img1 from "../../../assets/Audi A4 2023.jpg";
import img2 from "../../../assets/Ford Mustang Mach-E.jpg";
import img3 from "../../../assets/Mercedes-Benz GLC 2024.webp";
import img4 from "../../../assets/bmw-f30-vorsteiner-wallpaper-preview.jpg";
import img5 from "../../../assets/2023-corolla-hybrid-se-rubyflarepearl-016-1665769538.avif";

// Map blog ID to imported image
const imageMap = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
};

const BlogCart = ({ blogs }) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-lg hover:shadow-2xl border border-gray-200"
          >
            <Link to={`/blog/${blog.id}`}>
              <div className="p-4 h-56">
                <img
                  src={imageMap[blog.id]}
                  alt={blog.title}
                  className="w-full h-full object-cover object-center rounded-xl overflow-hidden"
                />
              </div>
              <div className="p-6 pt-2 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                  <span>{blog.date}</span>
                  <div className="w-1 h-[2px] bg-gray-600"></div>
                  <p className="">{blog.category}</p>
                </div>
                <h1 className="text-lg font-semibold text-gray-700 truncate">
                  {blog.title}
                </h1>
                <button className="text-sm font-medium text-gray-400 text-left cursor-pointer">
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
