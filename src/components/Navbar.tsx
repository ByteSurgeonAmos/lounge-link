import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#fff] p-4 flex justify-between items-center">
      <div className="text-[#219abc] font-bold text-xl">
        <Link href="/">CONNECT</Link>
      </div>
      <ul className="flex space-x-6 font-semibold">
        <li>
          <Link href="/" className="text-[#219abc] hover:text-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-[#219abc] hover:text-gray-200">
            Features
          </Link>
        </li>
        <li>
          <Link href="/events" className="text-[#219abc] hover:text-gray-200">
            Events
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-[#219abc] hover:text-gray-200">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
