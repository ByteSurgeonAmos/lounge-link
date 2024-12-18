"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { HiHome, HiUser, HiChatAlt2, HiCog } from "react-icons/hi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdExplore, MdCampaign } from "react-icons/md";
import { BiLinkAlt } from "react-icons/bi";
import { RiVipCrownLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface UserData {
  avatar: string | null;
  subscriptionTier: string;
}

const Sidenav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const navItems: NavItem[] = [
    { title: "Dashboard", path: "/dashboard", icon: <HiHome size={24} /> },
    { title: "Feed", path: "/feed", icon: <HiChatAlt2 size={24} /> },
    { title: "My Links", path: "/my-links", icon: <BiLinkAlt size={24} /> },
    { title: "LiveLinks", path: "/live-links", icon: <HiUser size={24} /> },
    { title: "Discover", path: "/discover", icon: <MdExplore size={24} /> },
    {
      title: "Try Premium",
      path: "/try-premium",
      icon: <RiVipCrownLine size={24} />,
    },
    { title: "Promote", path: "/promote", icon: <MdCampaign size={24} /> },
    { title: "Settings", path: "/settings", icon: <HiCog size={24} /> },
  ].filter((item) => {
    // Hide "Try Premium" if user has paid subscription
    if (item.title === "Try Premium") {
      return userData?.subscriptionTier === "FREE";
    }
    return true;
  });

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidenav}
          className="p-2 rounded-lg bg-gray-800 text-white"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Sidenav */}
      <div
        className={`fixed left-0 top-0 h-full bg-custom-blue text-white w-64 
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                md:translate-x-0`}
      >
        {/* Logo */}
        <div className="border-b border-blue-300 p-4">
          <div className="flex items-center justify-center space-x-2">
            <BiLinkAlt size={24} />
            <h1 className="text-2xl font-bold tracking-wider">LOUNGELINK</h1>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`flex items-center px-6 py-3 transition-colors duration-200
                  ${
                    pathname === item.path
                      ? "bg-gray-500 text-white"
                      : "text-gray-300 hover:bg-gray-300 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-4">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Updated Footer */}
        <div className="absolute bottom-0 w-full p-6 border-t border-blue-300">
          <div className="flex items-center space-x-4">
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-800"></div>
            )}
            <div className="flex-grow">
              <p className="text-sm font-medium">
                {session?.user?.name || "Guest User"}
              </p>
              <p className="text-xs text-white font-medium">
                {userData?.subscriptionTier || "FREE"} Plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
