import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ switchToSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 space-y-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800">
        Welcome Back
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-center text-gray-500">
        Sign in to continue
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div className="form-control space-y-2">
          <label className="label">
            <span className="label-text text-xs sm:text-sm md:text-base text-gray-700">
              Email
            </span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="form-control relative space-y-2">
          <label className="label">
            <span className="label-text text-xs sm:text-sm md:text-base text-gray-700">
              Password
            </span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-500 hover:text-indigo-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-block border-none bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm hover:from-indigo-600 hover:to-purple-600"
        >
          Sign In
        </button>
      </form>

      <div className="flex flex-col items-center space-y-4">
        <p className="text-xs sm:text-sm md:text-base text-gray-500">
          Or sign in with
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => console.log("Google login initiated")}
            className="btn btn-outline border-none bg-white text-gray-700 hover:bg-gray-100 flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span className="text-sm">Google</span>
          </button>

          <button
            onClick={() => console.log("Facebook login initiated")}
            className="btn btn-outline border-none bg-white text-blue-600 hover:bg-gray-100 flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png"
              alt="Facebook Logo"
              className="w-5 h-5"
            />
            <span className="text-sm">Facebook</span>
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs sm:text-sm md:text-base text-gray-500">
          Don&apos;t have an account?{" "}
          <span
            onClick={switchToSignup}
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
