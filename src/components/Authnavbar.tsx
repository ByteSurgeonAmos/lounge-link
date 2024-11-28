"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiMenu,
  HiX,
  HiHome,
  HiChatAlt2,
  HiUser,
  HiCog,
  HiBell,
  HiSearch,
  HiChevronDown,
} from "react-icons/hi";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MdExplore, MdCampaign } from "react-icons/md";
import { BiLinkAlt } from "react-icons/bi";
import { RiVipCrownLine } from "react-icons/ri";
import { useSession } from "next-auth/react";

interface AuthNavbarProps {
  isAuthenticated: boolean;
  onLogout?: () => void;
  userName?: string;
}

interface UserData {
  avatar: string | null;
  subscriptionTier: string;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({
  isAuthenticated,
  onLogout,
  userName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUserData(data);
      }
    };
    fetchUserData();
  }, [session]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  const isActivePath = (path: string) => pathname === path;

  const navItems = [
    { title: "Dashboard", path: "/dashboard", icon: <HiHome size={20} /> },
    { title: "Feed", path: "/feed", icon: <HiChatAlt2 size={20} /> },
    { title: "My Links", path: "/my-links", icon: <BiLinkAlt size={20} /> },
    { title: "LiveLinks", path: "/live-links", icon: <HiUser size={20} /> },
    { title: "Discover", path: "/discover", icon: <MdExplore size={20} /> },
    {
      title: "Try Premium",
      path: "/try-premium",
      icon: <RiVipCrownLine size={20} />,
    },
    { title: "Promote", path: "/promote", icon: <MdCampaign size={20} /> },
    { title: "Settings", path: "/settings", icon: <HiCog size={20} /> },
  ];

  return (
    <nav className="bg-custom-blue text-white shadow-lg">
      {/* Mobile menu button - Moved outside and increased z-index */}
      <button
        onClick={toggleMenu}
        className="fixed md:hidden top-4 left-4 inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700/50 transition duration-200 bg-custom-blue z-50"
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Rest of desktop nav */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between flex-1">
          <div className="flex justify-between gap-4">
            {/* Search box and other menu items */}
            <div className="relative ml-auto ">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 pl-10 pr-4 rounded-lg bg-white-800/50 focus:bg-white focus:text-black transition-all duration-200 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Search"
              />
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <Link
              href="/feed"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition duration-200 ${
                isActivePath("/feed")
                  ? "bg-blue-700 text-white"
                  : "hover:bg-white/50"
              }`}
              aria-label="Feed"
            >
              <HiChatAlt2 size={20} />
              <span>Feed</span>
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  href="/my-links"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition duration-200 ${
                    isActivePath("/my-links")
                      ? "bg-blue-700 text-white"
                      : "hover:bg-white/50"
                  }`}
                >
                  <HiUser size={20} />
                  <span>My Links</span>
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-white/50 transition duration-200"
                  >
                    <span>{userName}</span>
                    <HiChevronDown
                      className={`transform transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-black py-1 z-50">
                      <Link
                        href="/settings"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings/security"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {!isAuthenticated && (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed inset-0 bg-custom-blue transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        <div className="h-full overflow-y-auto px-2 pt-20 pb-6">
          {/* Search box for mobile */}
          <div className="relative px-2 mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-white-800/50 focus:bg-white focus:text-black"
            />
            <HiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-700/50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>

          {/* User section - Updated */}
          {isAuthenticated ? (
            <div className="mt-8 px-4 pt-4 border-t border-white">
              <div className="flex items-center space-x-3 mb-4">
                {userData?.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-800"></div>
                )}
                <div>
                  <span className="font-medium block">{userName}</span>
                  <span className="text-sm text-gray-300">
                    {userData?.subscriptionTier || "FREE"} Plan
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-8 px-4 pt-4 border-t border-blue-700 space-y-2">
              <Link
                href="/login"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block w-full text-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
