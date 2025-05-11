import React from 'react';
import banner from "./assets/offer-banner.jpg";

const Banner = () => {
    return (
        <div
            className="relative w-10/12 mx-auto overflow-hidden"
        >
            <div
                className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(${banner})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-end h-full">
                    <div className="text-white max-w-md text-left p-6">
                        <h1 className="mb-4 text-xl bg-[#ff0000] rounded-xl font-bold inline-block px-3 py-1">
                            Synlig 50% Tranding
                        </h1>
                        <p className="text-4xl font-bold pr-15">
                            Shop Luxurious  <br /> Sport Car
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Banner;
