import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contacts from './pages/Contacts.jsx';
import Products from './pages/products/Products.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Root from './Root.jsx';
import SingleProduct from './pages/products/SingleProduct.jsx';
import Blog from './pages/Blog.jsx';
import SingleBlog from './pages/products/blog/SingleBlog.jsx';
import Wishlist from './Wishlist.jsx';
import AddToCarts from './AddToCarts.jsx';
import { GlobalProvider } from './context/GlobalState.jsx';
import Login from './Components/login,signup/Login.jsx';
import Signup from './Components/login,signup/Signup.jsx';
import Payment from './Payment.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/addtocart",
        element: <AddToCarts />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
       <ToastContainer position="top-center" autoClose={2000} />
    </GlobalProvider>
    
  </StrictMode>,
)
