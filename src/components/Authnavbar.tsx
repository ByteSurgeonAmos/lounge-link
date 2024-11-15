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
} from "react-icons/hi";

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-custom-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          {/* <Link href="/" className="text-xl font-bold">
            LoungeConnect
          </Link> */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 pl-10 focus:outline-none rounded-md text-black"
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <Link href="/feed" className="hover:bg-blue-300 px-3 py-2 rounded-md">
            <HiChatAlt2 size={20} />
          </Link>
          {isAuthenticated && (
            <Link
              href="/my-links"
              className="hover:bg-blue-300 px-3 py-2 rounded-md"
            >
              <HiUser size={20} />
            </Link>
          )}
          {isAuthenticated && (
            <div className="relative">
              <button className="p-2 rounded-md hover:bg-blue-300">
                <HiBell size={20} />
              </button>
            </div>
          )}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {userName}</span>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
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
                  onClick={onLogout}
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
      )}
    </nav>
  );
};

export default AuthNavbar;
