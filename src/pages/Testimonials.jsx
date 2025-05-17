import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Import images directly
import img1 from "../assets/handsome-bearded-guy-posing-against-white-wall.jpg";
import img2 from "../assets/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer.jpg";
import img3 from "../assets/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction.jpg";
import img4 from "../assets/young-bearded-man-with-striped-shirt.jpg";
import img5 from "../assets/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg";

// ✅ Use imported images in the array
const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    position: "Marketing Manager",
    image: img1,
    review: "Their service truly transformed our business approach. Highly recommended!",
  },
  {
    id: 2,
    name: "James Smith",
    position: "E-commerce Owner",
    image: img2,
    review: "Great attention to detail and fast turnaround time!",
  },
  {
    id: 3,
    name: "Sarah Williams",
    position: "Creative Director",
    image: img3,
    review: "A pleasure to work with. They understood our vision perfectly.",
  },
  {
    id: 4,
    name: "Michael Brown",
    position: "Startup Founder",
    image: img4,
    review: "Professional, punctual, and very creative. Couldn't ask for more.",
  },
  {
    id: 5,
    name: "Olivia Davis",
    position: "Social Media Strategist",
    image: img5,
    review: "Fantastic results and very easy communication throughout the project.",
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const startIndex = currentSlide * itemsPerSlide;
  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + itemsPerSlide
  );

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 relative">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-700">
        What Our Clients Say
      </h2>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-white border rounded-full p-2 shadow hover:bg-[#ff0000] hover:text-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-white border rounded-full p-2 shadow hover:bg-[#ff0000] hover:text-white"
      >
        <ChevronRight size={24} />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
        {visibleTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {testimonial.name}
            </h3>
            <p className="text-sm text-[#ff0000] mb-2">
              {testimonial.position}
            </p>
            <p className="text-gray-600 text-sm italic">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
