import React from 'react';


import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';

import Navbar from './Components/Navbar';
import Midheader from './Components/Midheader';
import ScrollButton from './ScrollButton';

const Root = () => {
    return (
        <div>
            
            <Midheader />
            <Navbar />
            <Outlet />
            <Footer />
            <ScrollButton/>
        </div>
    );
};

export default Root;
