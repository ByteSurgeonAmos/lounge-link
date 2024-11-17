"use client";
import Footer from "@/components/Footer";
import ImageNetwork from "@/components/ImageNetwork";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  jobTitle: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    jobTitle: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [backendError, setBackendError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const toastConfig = {
    success: {
      className: "bg-green-50 text-green-800 border-l-4 border-green-500",
      duration: 3000,
      icon: "✅",
    },
    error: {
      className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      duration: 4000,
      icon: "❌",
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "password" || id === "confirmPassword") {
      setPasswordMatch(
        id === "password"
          ? value === formData.confirmPassword
          : formData.password === value
      );
    }

    if (id === "password") {
      evaluatePasswordStrength(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError("");
    setIsLoading(true);

    if (!passwordMatch) {
      toast.error("Passwords do not match", toastConfig.error);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Signup successful! Redirecting to login...",
          toastConfig.success
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          phone: "",
          jobTitle: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        setBackendError(data.message || "Something went wrong");
        toast.error(data.message || "Signup failed", toastConfig.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred", toastConfig.error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {backendError && (
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-white p-4 rounded-md shadow-lg">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{backendError}</span>
                  </div>
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block mb-2 text-sm">
                    First Name
                  </label>
                  <input
                    value={formData.firstName}
                    onChange={handleChange}
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
                    value={formData.lastName}
                    onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="bg-white/20 text-white placeholder:text-white/70 indent-4 h-12 rounded-md focus:outline-none w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="username" className="block mb-2 text-sm">
                  Username
                </label>
                <input
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  id="username"
                  placeholder="Choose a username"
                  className="bg-white/20 text-white placeholder:text-white/70 indent-4 h-12 rounded-md focus:outline-none w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="block mb-2 text-sm">
                  Phone Number
                </label>
                <input
                  value={formData.phone}
                  onChange={handleChange}
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
                  value={formData.jobTitle}
                  onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
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
              <div className="flex-1">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="bg-white/20 text-white placeholder:text-white/70 indent-4 h-12 rounded-md focus:outline-none w-full pr-10"
                  />
                </div>
                {!passwordMatch && formData.confirmPassword && (
                  <span className="text-red-500 text-sm mt-2">
                    Passwords do not match
                  </span>
                )}
              </div>
              <button
                disabled={isLoading}
                className="bg-white text-[#219abc] font-bold py-3 px-6 rounded-full w-full hover:bg-gray-200 transition-colors duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Spinner color="black" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
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
