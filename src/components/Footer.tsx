import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50  text-custom-blue py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-8 border-2 p-4 rounded-md">
        {/* Logo and Subscription Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-8">
          {/* Logo and Subscription */}
          <div className="text-center  md:text-left mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img
                src="/loungelink-logo.png" // Logo image path
                alt="LoungeLink Logo"
                className="h-8 mr-2"
              />
              <span className="text-2xl font-bold text-[#1ea0b7]">
                LOUNGELINK
              </span>
            </div>
            <p>
              Stay Linked by subscribing to our newsletter and other updates.
            </p>
            <form className="flex items-center mt-4 max-w-xs mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter your email address"
                className=" placeholder:text-custom-blue w-full p-2 rounded-l-md border border-gray-300 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gray-200  p-2 rounded-r-md hover:bg-[#1ea0b7] hover:text-white transition"
              >
                →
              </button>
            </form>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center md:text-left">
            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold ">Company</h4>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Links */}
            <div>
              <h4 className="text-lg font-semibold ">Contact</h4>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Contact Form
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    T&C
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold ">Social</h4>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1ea0b7]">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-8" />

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-4 md:mb-0">
            &copy; LoungeLink. All Rights Reserved 2024
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#1ea0b7]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#1ea0b7]">
              Terms & Conditions
            </a>
          </div>
          <a
            href="#"
            className="bg-[#1ea0b7] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#1a8da4] transition"
          >
            Go Premium
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
