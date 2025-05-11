import React, { useEffect, useState } from "react";


import PageHeader from "../Components/PageHeader";
import LeftBlog from "./products/blog/LeftBlog";
import BlogDetails from "./products/blog/BlogDetails";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/src/assets/Blogs.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/src/assets/BlogCategory.json")
      .then((res) => res.json())
      .then((data) => setBlogCategories(data));
  }, []);

  const handleCheckboxChange = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((name) => name !== categoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <>
      <div className="w-10/12 mx-auto mt-5 mb-5">
        <div className="flex flex-col gap-6 md:gap-10 lg:gap-12">
          {/* <PageHeader page={"Blog"} /> */}
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16  "></div>
            </div>
          ) : (
            <div className="flex flex-col-reverse lg:flex-row gap-6">
              <div className="w-full lg:w-1/4">
                <LeftBlog
                  blogCategories={blogCategories}
                  selectedCategories={selectedCategories}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
              <div className="w-full lg:w-3/4">
                <BlogDetails
                  blogs={blogs}
                  selectedCategories={selectedCategories}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
