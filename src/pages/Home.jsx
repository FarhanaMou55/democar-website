import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import heroimg from "../assets/hero.jpg";
import heroimg2 from "../assets/her.mp4";
import Catagories from "../pages/products/Catagories";
import DayOfTheDealCarts from "./products/DayOfTheDealCarts";
import Topfooter from "./Topfooter";
import TrendingItem from "./products/TrendingItem";
import Testimonials from "./Testimonials";
import Banner from "../Banner";
import LatestBlog from "./products/blog/LatestBlog";


const slides = [
    {
        type: "video",
        source: heroimg2,
        title: "welcome to nexaro",
        description:
            "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.",
    },
    {
        type: "image",
        source: heroimg,
        title: "drive with style",
        description:
            "Discover premium cars at unbeatable prices. Your next ride is just a click away with Nexaro!",
    },
];


const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);
    const currentSlide = slides[currentIndex];
    const [blogs, setBlogs] = useState([]);
      

    // Auto-slide for image
    useEffect(() => {
        let timer;
        if (currentSlide.type === "image") {
            timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % slides.length);
            }, 5000);
        }
        return () => clearInterval(timer);
    }, [currentIndex]);
     


    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };
    useEffect(() => {
        fetch("/src/assets/Blogs.json")
            .then((res) => res.json())
            .then((data) => setBlogs(data));
    }, []);
    return (
        <div >
            <div className="w-full h-screen relative ">
                <div className=" relative h-full overflow-hidden w-10/12 mx-auto">
                    {/* Background Media */}
                    {currentSlide.type === "video" ? (
                        <video
                            ref={videoRef}
                            src={currentSlide.source}
                            autoPlay
                            loop={false}
                            muted
                            className="absolute top-0 left-0 w-full h-full object-cover z-0"
                            onEnded={nextSlide}
                        />
                    ) : (
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
                            style={{ backgroundImage: `url(${currentSlide.source})` }}
                        ></div>
                    )}

                    {/* Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full  z-10"></div>

                    {/* Text Content */}
                    <div className="relative z-20 h-full flex items-center justify-end pr-10 text-white  md:text-left">
                        <div className="max-w-sm  ">
                            <h1 className="mb-5 uppercase text-5xl font-bold">{currentSlide.title}</h1>
                            <p className="mb-5 text-xl">{currentSlide.description}</p>
                            <Link to="/products">
                                <button className="btn bg-[#ff0000] text-white hover:bg-gray-200 hover:text-black uppercase">
                                    Shop now
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Arrows */}
                    <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-30 hover:bg-opacity-60 p-2 rounded-full z-30"
                        onClick={prevSlide}
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-30 hover:bg-opacity-60 p-2 rounded-full z-30"
                        onClick={nextSlide}
                    >
                        <FaChevronRight />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${idx === currentIndex ? "bg-white" : "bg-gray-400"
                                    }`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            <Catagories />
            <DayOfTheDealCarts />
            <Banner />
            <TrendingItem />
            
            <Testimonials />
            <LatestBlog blogs={blogs} />
            <Topfooter />
        </div>
    );
};

export default Home;
