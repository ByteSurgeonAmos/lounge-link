"use client";
import Footer from "@/components/Footer";
import ImageNetwork from "@/components/ImageNetwork";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

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

  // Show loading state while checking session
  if (status === "loading") {
    return <div>Loading...</div>;
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
      <div className="flex bg-gradient-to-r from-[#219abc] to-[#51c3da] h-screen p-8 text-white gap-9">
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
              <input
                type={getInputType()}
                name="identifier"
                placeholder={getInputPlaceholder()}
                value={formData.identifier}
                onChange={handleInputChange}
                className="bg-white placeholder:text-[#219abc] indent-4 h-12 rounded-full focus:outline-none w-full"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-white placeholder:text-[#219abc] indent-4 h-12 rounded-full focus:outline-none w-full"
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="remember-me"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <p className="text-sm">Remember me</p>
                </div>
                <p className="text-sm underline">Forgot Password?</p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#219abc] text-white font-bold py-3 px-6 rounded-full w-full hover:bg-[#28b0d2] transition-colors duration-300 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Logging in..." : "LOGIN"}
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
