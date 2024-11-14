"use client";
import Footer from "@/components/Footer";
import ImageNetwork from "@/components/ImageNetwork";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Password strength evaluation
  const evaluatePasswordStrength = (password: string) => {
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      setPasswordStrength("Strong");
    } else if (password.length > 5) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-[#219abc] to-[#51c3da] text-white gap-3">
        <div className="container mx-auto py-16 px-4 sm:px-6 gap-4 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold">
              Connect the distance between <br /> you and others!
            </h1>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block mb-2 text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    className="bg-white/20 text-white placeholder:text-white/70 indent-4 h-12 rounded-md focus:outline-none w-full"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block mb-2 text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                    className="bg-white/20 text-white placeholder:text-white/70 indent-4 h-12 rounded-md focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="bg-white/20 text-white placeholder:text-white/70 indent-4 h-12 rounded-md focus:outline-none w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="block mb-2 text-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="bg-white/20 text-white placeholder:text-white/70 indent-4 h-12 rounded-md focus:outline-none w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="jobTitle" className="block mb-2 text-sm">
                  Job Title
                </label>
                <select
                  id="jobTitle"
                  className="bg-white/20 text-white placeholder:text-white/70 indent-4 h-12 rounded-md focus:outline-none w-full"
                >
                  <option className="text-black" value="">
                    Choose from Dropdown
                  </option>
                  <option value="developer" style={{ color: "black" }}>
                    Software Developer
                  </option>
                  <option value="designer" style={{ color: "black" }}>
                    UI/UX Designer
                  </option>
                  <option value="manager" style={{ color: "black" }}>
                    Project Manager
                  </option>
                  <option value="analyst" style={{ color: "black" }}>
                    Data Analyst
                  </option>
                  <option value="marketing" style={{ color: "black" }}>
                    Marketing Specialist
                  </option>
                  <option value="sales" style={{ color: "black" }}>
                    Sales Representative
                  </option>
                  <option value="consultant" style={{ color: "black" }}>
                    Business Consultant
                  </option>
                  <option value="engineer" style={{ color: "black" }}>
                    Systems Engineer
                  </option>
                  <option value="hr" style={{ color: "black" }}>
                    HR Specialist
                  </option>
                  <option value="business-person" style={{ color: "black" }}>
                    Business Person
                  </option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="password" className="block mb-2 text-sm">
                  Create Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      evaluatePasswordStrength(e.target.value);
                    }}
                    placeholder="Enter a strong password"
                    className="bg-white/20 text-white placeholder:text-white/70 indent-4 h-12 rounded-md focus:outline-none w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-white focus:outline-none"
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <span
                  className={`text-sm mt-2 ${
                    passwordStrength === "Strong"
                      ? "text-green-500"
                      : passwordStrength === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {passwordStrength}
                </span>
              </div>
              <button className="bg-white text-[#219abc] font-bold py-3 px-6 rounded-full w-full hover:bg-gray-200 transition-colors duration-300">
                Create Account
              </button>
            </form>
          </div>
          <div className="md:w-1/2 hidden md:block">
            <ImageNetwork />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
