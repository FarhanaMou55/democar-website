import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { FaEarthAmericas, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const ContactInfo = () => {
  return (
    <div>
      <div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white border-[1px] border-gray-400 rounded-lg p-6">
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <img
                  className="w-20"
                  src="https://cdn-icons-png.flaticon.com/128/732/732200.png"
                  alt=""
                />
                <h3 className="text-gray-600 text-lg font-semibold">
                  Mail & Website
                </h3>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-600 flex gap-2 items-center">
                    <MdEmail /> farhanamou828@gmail.com
                  </p>
                  <p className="text-sm text-gray-600 flex gap-2 items-center">
                    <FaEarthAmericas />
                    www.yourdomain.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-[1px] border-gray-400 rounded-lg p-6">
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <img
                  className="w-20"
                  src="https://cdn-icons-png.flaticon.com/128/3437/3437364.png"
                  alt=""
                />
                <h3 className="text-gray-600 text-lg font-semibold">Contact</h3>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-600 flex gap-2 items-center">
                    <FaMobileAlt /> 016********
                  </p>
                  <p className="text-sm text-gray-600 flex gap-2 items-center">
                    <FaMobileAlt />
                    013********
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-[1px] border-gray-400 rounded-lg p-6">
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <img
                  className="w-20"
                  src="https://cdn-icons-png.flaticon.com/128/1865/1865269.png"
                  alt=""
                />
                <h3 className="text-gray-600 text-lg font-semibold">Address</h3>
                <p className="text-sm text-gray-600 flex gap-2 items-center">
                  <FaLocationDot />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
