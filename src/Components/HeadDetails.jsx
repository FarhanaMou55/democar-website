import React from "react";

const HeadDetails = ({ title, colortitle, subtitle }) => {
  return (
    <div>
      <div >
        <div className="text-center flex flex-col gap-1 mt-5 mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
            {title} <span className="text-[#ff0000]">{colortitle}</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 w-sm mx-auto">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default HeadDetails;
