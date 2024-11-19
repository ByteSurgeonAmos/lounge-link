"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navigationItems = [
    { title: "My Profile", path: "/settings" },
    { title: "Security", path: "/settings/security" },
    { title: "Notifications", path: "/settings/notifications" },
    { title: "Billing", path: "/settings/billing" },
    { title: "Privacy Policy", path: "/settings/privacy" },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmed) {
      try {
        toast.loading("Deleting account...");
        const response = await fetch("/api/users/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          toast.success("Account deleted successfully");
          signOut({ callbackUrl: "/auth/login" });
        } else {
          toast.error("Failed to delete account. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("An error occurred while deleting your account.");
      }
    }
  };

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
                      pathname === item.path
                        ? "bg-gray-100 font-medium text-custom-blue"
                        : ""
                    } `}
                  >
                    {item.title}
                  </div>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 rounded-md cursor-pointer mb-1 hover:bg-gray-50"
              >
                Sign Out
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full text-left py-2 px-4 rounded-md cursor-pointer mb-1 hover:bg-gray-50 text-red-500"
              >
                Delete Account
              </button>
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
