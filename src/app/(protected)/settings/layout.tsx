import React from "react";
import Link from "next/link";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const navigationItems = [
    { title: "My Profile", path: "/settings" },
    { title: "Security", path: "/settings/security" },
    { title: "Notifications", path: "/settings/notifications" },
    { title: "Billing", path: "/settings/billing" },
    { title: "Privacy Policy", path: "/settings/privacy" },
    { title: "Sign Out", path: "/settings/signout" },
    {
      title: "Delete Account",
      path: "/settings/delete-account",
      className: "text-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Left Navigation */}
          <div className="w-full md:w-64">
            <nav className="bg-white rounded-lg p-4 shadow-sm sticky top-4">
              {navigationItems.map((item, index) => (
                <Link href={item.path} key={index}>
                  <div
                    className={`py-2 px-4 rounded-md cursor-pointer mb-1 hover:bg-gray-50 ${
                      item.className || ""
                    }`}
                  >
                    {item.title}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
