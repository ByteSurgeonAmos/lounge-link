"use client";
import Navbar from "@/components/Authnavbar";
import Sidebar from "@/components/Sidenav";
import {
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineShoppingCart,
  HiOutlineCalendar,
} from "react-icons/hi";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar isAuthenticated={true} userName="Amos" />
        <main className="p-8">
          <div className="container mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-black">
              Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

const DashboardCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: any;
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      </div>
    </div>
  );
};
