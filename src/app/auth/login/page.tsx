import Footer from "@/components/Footer";
import ImageNetwork from "@/components/ImageNetwork";
import Navbar from "@/components/Navbar";
import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex bg-gradient-to-r from-[#219abc] to-[#51c3da]  h-screen p-8 text-white gap-9">
        <div className="w-full flex flex-col justify-center">
          <p className="text-4xl font-bold mb-2">LATTELINK</p>
          <p className="text-lg mb-8">
            Connect, Collaborate and Grow at your own Pace.
          </p>
          <div className="rounded-lg bg-white/20 p-8 backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-center font-thin mb-6">
              Please sign in before continuing
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="bg-white placeholder:text-[#219abc] indent-4 h-12 rounded-full focus:outline-none w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-white placeholder:text-[#219abc] indent-4 h-12 rounded-full focus:outline-none w-full"
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="h-4 w-4"
                  />
                  <p className="text-sm">Remember me</p>
                </div>
                <p className="text-sm underline">Forgot Password?</p>
              </div>
              <button className="bg-[#219abc] text-white font-bold py-3 px-6 rounded-full w-full hover:bg-[#28b0d2] transition-colors duration-300">
                LOGIN
              </button>
              <div className="flex items-center justify-center gap-3">
                <p className="text-sm">Don't have an account?</p>
                <p className="text-sm font-bold">Create Account</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
              <hr className="flex-1 border-[#ccc]" />
              <p className="text-sm">or continue with</p>
              <hr className="flex-1 border-[#ccc]" />
            </div>
            <div className="flex justify-between mt-6">
              <button className="bg-blue-600 text-white p-3 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors duration-300">
                <FaPhone className="h-5 w-5" />
                Phone Number
              </button>
              <button className="bg-green-400 text-white p-3 rounded-md flex items-center gap-2 hover:bg-green-500 transition-colors duration-300">
                <FaEnvelope className="h-5 w-5" />
                Email address
              </button>
            </div>
          </div>
        </div>
        <div className="  w-1/2 sm:w-full flex justify-center items-center">
          <ImageNetwork />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
