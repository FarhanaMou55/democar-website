import React from "react";
import { FaCarAlt, FaSearch, FaStar, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

// Team member images
import img1 from "/src/assets/handsome-bearded-guy-posing-against-white-wall.jpg";
import img2 from "/src/assets/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer.jpg";
import img3 from "/src/assets/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction.jpg";
import img4 from "/src/assets/young-bearded-man-with-striped-shirt.jpg";
import img5 from "/src/assets/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg";

const team = [
  { name: "Arman Khan", role: "Founder & CEO", image: img1 },
  { name: "Zubair Rahman", role: "Lead Developer", image: img2 },
  { name: "Sara Ali", role: "Marketing Manager", image: img3 },
  { name: "Tanvir Hasan", role: "UI/UX Designer", image: img4 },
  { name: "Naila Hossain", role: "Customer Success", image: img5 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const About = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 md:px-12 w-10/12 mx-auto">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Intro */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Nexaro</h2>
          <p className="text-gray-600 text-lg mb-2">
            At <span className="font-semibold text-red-600">Nexaro</span>, we’re redefining how
            people discover, compare, and purchase vehicles.
          </p>
          <p className="text-gray-600 text-lg">
            Whether you’re upgrading or buying your first car, we’re here to drive you forward.
          </p>
        </motion.div>

        {/* Features */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">Why Nexaro?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[FaCarAlt, FaSearch, FaStar, FaHandshake].map((Icon, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded shadow hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeInUp}
              >
                <Icon className="text-3xl text-red-600 mb-3 mx-auto" />
                <h4 className="font-semibold text-lg mb-2">
                  {["Wide Selection", "Smart Search", "Honest Reviews", "Trusted Deals"][i]}
                </h4>
                <p className="text-gray-600 text-sm">
                  {
                    [
                      "Top brands, verified listings, and various categories.",
                      "Advanced filters for personalized results.",
                      "Genuine user ratings and reviews.",
                      "Secure transactions with verified sellers.",
                    ][i]
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Nexaro empowers people to find the perfect vehicle easily and with confidence. We
            believe in innovation, honesty, and building trust through technology.
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-10">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md hover:-translate-y-1 transform transition-all duration-300 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeInUp}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 hover:scale-105 transition-transform duration-300"
                />
                <h4 className="font-semibold text-lg text-gray-800">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Newsletter */}
        <motion.div
          className="bg-white p-8 mt-16 rounded-lg shadow text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4"> 
            Join Our Community
            
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get the latest deals, new arrivals, and car insights from Nexaro.
          </p>
          <form className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-1/2"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
