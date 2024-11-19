"use client";
import React, { useState } from "react";
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

interface AuthNavbarProps {
  isAuthenticated: boolean;
  onLogout?: () => void;
  userName?: string;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({
  isAuthenticated,
  onLogout,
  userName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  const isActivePath = (path: string) => pathname === path;

  return (
    <nav className="bg-custom-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 w-full justify-end">
          {/* Search Box */}
          <div className="relative ml-auto">
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
                : "hover:bg-blue-700/50"
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
                    : "hover:bg-blue-700/50"
                }`}
              >
                <HiUser size={20} />
                <span>My Links</span>
              </Link>

              <button
                className="relative p-2 rounded-md hover:bg-blue-700/50 transition duration-200"
                aria-label="Notifications"
              >
                <HiBell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700/50 transition duration-200"
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

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700/50 transition duration-200"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className=" hover:bg-gray-700 px-3 py-2 rounded-md flex items-center"
          >
            <HiHome size={20} className="mr-2" />
            Home
          </Link>
          <Link
            href="/feed"
            className=" hover:bg-gray-700 px-3 py-2 rounded-md flex items-center"
          >
            <HiChatAlt2 size={20} className="mr-2" />
            Feed
          </Link>
          {isAuthenticated && (
            <Link
              href="/my-links"
              className=" hover:bg-gray-700 px-3 py-2 rounded-md flex items-center"
            >
              <HiUser size={20} className="mr-2" />
              My Links
            </Link>
          )}
          <Link
            href="/settings"
            className=" hover:bg-gray-700 px-3 py-2 rounded-md flex items-center"
          >
            <HiCog size={20} className="mr-2" />
            Settings
          </Link>
          {isAuthenticated && (
            <div className="pt-4">
              <span className="block px-3 py-2 text-gray-300">
                Welcome, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md mt-2"
              >
                Logout
              </button>
            </div>
          )}
          {!isAuthenticated && (
            <div className="pt-4 space-y-2">
              <Link
                href="/login"
                className="block bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md"
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
