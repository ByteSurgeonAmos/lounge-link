"use client";
import Footer from "@/components/Footer";
import ImageNetwork from "@/components/ImageNetwork";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { ChainLoader } from "@/components/ChainLoader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [loginMethod, setLoginMethod] = useState<
    "username" | "phone" | "email"
  >("username");
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleMethodChange = (method: "username" | "phone" | "email") => {
    setLoginMethod(method);
    setFormData((prev) => ({ ...prev, identifier: "" }));
    setError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        identifier: formData.identifier,
        password: formData.password,
        loginMethod,
        rememberMe: formData.rememberMe,
        redirect: false,
      });
      if (result?.status === 401) {
        setError("Invalid credentials");
        // toast.error("Failed to authenticate");
        return;
      }

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        return;
      }

      if (result?.ok) {
        toast.success("Login successful!");
        // Use replace instead of push to avoid the DOM manipulation error
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = "An error occurred during login";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="flex justify-center w-full h-[100vh] items-center">
        <ChainLoader />
      </div>
    );
  }

  const getInputPlaceholder = () => {
    switch (loginMethod) {
      case "phone":
        return "Phone Number";
      case "email":
        return "Email Address";
      default:
        return "Username";
    }
  };

  const getInputType = () => {
    switch (loginMethod) {
      case "email":
        return "email";
      case "phone":
        return "tel";
      default:
        return "text";
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex bg-gradient-to-r from-[#219abc] to-[#51c3da] min-h-screen p-8 text-white gap-9">
        <div className="w-full flex flex-col justify-center">
          <p className="text-4xl font-bold mb-2">LATTELINK</p>
          <p className="text-lg mb-8">
            Connect, Collaborate and Grow at your own Pace.
          </p>
          <div className="rounded-lg bg-white/20 p-8 backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <p className="text-center font-thin mb-6">
              Please sign in before continuing
            </p>
            <form onSubmit={handleLogin} className="space-y-4 text-black">
              <div className="relative">
                <input
                  type={getInputType()}
                  name="identifier"
                  placeholder={getInputPlaceholder()}
                  value={formData.identifier}
                  onChange={handleInputChange}
                  className="bg-white placeholder:text-[#219abc] indent-4 h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-[#219abc] w-full transition-all duration-200"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-white placeholder:text-[#219abc] indent-4 h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-[#219abc] w-full pr-12 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>

              <div className="flex justify-between items-center text-white">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-[#219abc]"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#219abc] text-white font-bold py-3 px-6 rounded-full w-full 
                hover:bg-[#28b0d2] transition-all duration-300 transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#219abc]
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "LOGIN"
                )}
              </button>
              <div className="flex items-center justify-center gap-3">
                <p className="text-sm">Don't have an account?</p>
                <Link href="/auth/signup" className="text-sm font-bold">
                  Create Account
                </Link>
              </div>
            </form>
            <div className="flex items-center justify-center gap-3 mt-6">
              <hr className="flex-1 border-[#ccc]" />
              <p className="text-sm">or continue with</p>
              <hr className="flex-1 border-[#ccc]" />
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleMethodChange("phone")}
                className={`${
                  loginMethod === "phone" ? "bg-blue-700" : "bg-blue-600"
                } text-white p-3 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors duration-300`}
              >
                <FaPhone className="h-5 w-5" />
                Phone Number
              </button>
              <button
                onClick={() => handleMethodChange("email")}
                className={`${
                  loginMethod === "email" ? "bg-green-500" : "bg-green-400"
                } text-white p-3 rounded-md flex items-center gap-2 hover:bg-green-500 transition-colors duration-300`}
              >
                <FaEnvelope className="h-5 w-5" />
                Email address
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 sm:w-full flex justify-center items-center">
          <ImageNetwork />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
