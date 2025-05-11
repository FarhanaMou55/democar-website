import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaHeart, FaComment } from "react-icons/fa";
import PageHeader from "../../../Components/PageHeader";



const SingleBlog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("/src/assets/Blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const foundBlog = data.find((blog) => blog.id == id);
        setBlog(foundBlog);
      });
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="w-10/12 mx-auto mt-5 ">
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* <PageHeader page={"Blog"} /> */}
          <div className="px-4 mb-10">
            <div className="max-w-5xl mx-auto bg-white rounded-lg border border-gray-300 overflow-hidden">
              <div className="h-64 md:h-80 lg:h-96 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-4">
                  <span className="inline-block bg-emerald-100 text-[#ff0000] text-xs md:text-sm font-medium px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                  {blog.title}
                </h1>

                <h2 className="text-lg sm:text-xl text-gray-600 mb-5">
                  {blog.subtitle}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <FaUser className="text-[#ff0000] text-xs sm:text-sm" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-[#ff0000] text-xs sm:text-sm" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaComment className="text-[#ff0000] text-xs sm:text-sm" />
                    <span>{blog.comments} comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-[#ff0000] text-xs sm:text-sm" />
                    <span>{blog.likes} likes</span>
                  </div>
                </div>

                <div className="prose max-w-none text-gray-700 mb-7 text-sm sm:text-base leading-relaxed">
                  <p className="whitespace-pre-line">{blog.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-500">Tags:</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    #fastfood
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    #health
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    #diet
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5">
                  Comments ({blog.comments})
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm sm:text-base">
                    Comments section would go here...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
