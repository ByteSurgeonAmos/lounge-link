import React, { useState } from "react";
import ImageNetwork from "./ImageNetwork";
import { FaUserCircle } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ConnectAndGrowComponent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        identifier: formData.identifier,
        password: formData.password,
        loginMethod: "username",
        redirect: false,
      });

      if (result?.status === 401) {
        setError("Invalid credentials");
        toast.error("Invalid credentials");
        return;
      }

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        return;
      }

      if (result?.ok) {
        toast.success("Login successful!");
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full bg-gradient-to-r from-[#219abc] to-[#51c3da] text-white">
      <div className="p-10 md:p-16 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4 uppercase">
          Connect, Collaborate and Grow at Your Own Pace
        </h2>
        <p className="text-lg mb-8">
          Take the pressure off and focus on building meaningful connections.
        </p>
        {error && <p className="text-red-200 mb-4">{error}</p>}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 justify-center"
        >
          <div className="flex items-center bg-[#fbd1a2] text-black rounded-full px-4 py-2 w-full md:w-auto">
            <FaUserCircle className="h-6 mr-2 text-gray-600" />
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleInputChange}
              placeholder="Username"
              className="bg-transparent placeholder:text-gray-600 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center bg-[#fbd1a2] text-black rounded-full px-4 py-2 w-full md:w-auto relative">
            <TbPasswordUser className="h-6 mr-2 text-gray-600" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="bg-transparent placeholder:text-gray-600 focus:outline-none w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-600"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 w-full md:w-auto disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Get Started"}
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <a href="/auth/signup" className="hover:underline">
            Create Account
          </a>
          <a href="/auth/forgot-password" className="hover:underline">
            Need Help?
          </a>
        </div>
      </div>
      <div className="hidden md:block w-full">
        <ImageNetwork />
      </div>
    </div>
  );
};

export default ConnectAndGrowComponent;
