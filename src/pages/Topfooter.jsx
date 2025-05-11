import React from 'react';
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaHandHoldingUsd } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";

const Topfooter = () => {
    return (
        <div className='bg-[#ff0000] p-3 w-11/12 md:w-10/12 mx-auto'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center py-2 md:divide-x md:divide-white'>
                <div className='flex items-start md:items-center text-white px-0 md:px-4 py-2'>
                    <LiaShippingFastSolid className='text-4xl md:text-5xl' />
                    <div className='flex flex-col ml-2'>
                        <h1 className='text-base md:text-md font-semibold'>Worldwide Shipping</h1>
                        <p className='text-sm'>Order Above $100</p>
                    </div>
                </div>
                <div className='flex items-start md:items-center text-white px-0 md:px-4 py-2'>
                    <FaHandHoldingUsd className='text-4xl md:text-5xl' />
                    <div className='flex flex-col ml-2'>
                        <h1 className='text-base md:text-md font-semibold'>Money Back Guarantee</h1>
                        <p className='text-sm'>Guarantee Within 30 Days</p>
                    </div>
                </div>
                <div className='flex items-start md:items-center text-white px-0 md:px-4 py-2'>
                    <RiDiscountPercentLine className='text-4xl md:text-5xl' />
                    <div className='flex flex-col ml-2'>
                        <h1 className='text-base md:text-md font-semibold'>Offers And Discounts</h1>
                        <p className='text-sm'>Back Returns In 7 Days</p>
                    </div>
                </div>
                <div className='flex items-start md:items-center text-white px-0 md:px-4 py-2'>
                    <RiCustomerService2Fill className='text-4xl md:text-5xl' />
                    <div className='flex flex-col ml-2'>
                        <h1 className='text-base md:text-md font-semibold'>24/7 Support Services</h1>
                        <p className='text-sm'>Any Time Support</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topfooter;
