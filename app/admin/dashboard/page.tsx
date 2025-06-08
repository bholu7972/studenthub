"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Book,
  Calendar,
  Settings,
  Layout,
  Bell,
  ChevronsRight,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

interface UserStat {
  role: string;
  count: number;
}

interface CourseStat {
  total: number;
  active: number;
}

const AdminDashboard: React.FunctionComponent = () => {
  const userStats: UserStat[] = [
    { role: "Students", count: 250 },
    { role: "Teachers", count: 35 },
    { role: "Admins", count: 5 },
  ];

  const courseStats: CourseStat = {
    total: 120,
    active: 105,
  };

  const recentRegistrations: { name: string; role: string; date: string }[] = [
    { name: "Luna Lovegood", role: "Student", date: "2025-05-02" },
    { name: "Severus Snape Jr.", role: "Teacher", date: "2025-05-01" },
    { name: "Albus Dumbledore II", role: "Admin", date: "2025-04-30" },
    { name: "Cho Chang", role: "Student", date: "2025-04-29" },
  ];

  const systemOverview = [
    { label: "Server Status", value: "Online", color: "text-green-500" },
    { label: "Database Health", value: "Good", color: "text-green-500" },
    { label: "Active Sessions", value: "42", color: "text-blue-500" },
    { label: "Pending Reports", value: "3", color: "text-yellow-500" },
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInClass = mounted
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4";
  const transitionClass = "transition-all duration-300 ease-in-out";

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header
            className={`bg-white shadow rounded-lg p-6 mb-8 ${fadeInClass} ${transitionClass}`}
          >
            <h1 className="text-2xl font-semibold text-gray-800">
              Admin Dashboard{" "}
              <span className="text-indigo-500 text-xl ml-2 animate-pulse">
                ✨
              </span>
            </h1>
            <p className="text-sm text-gray-500">
              System Overview and Management
            </p>
          </header>

          {/* Overview Section */}
          <section
            className={`mb-8 ${fadeInClass} ${transitionClass} delay-100`}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <Layout className="inline-block mr-2 align-middle h-6 w-6 text-indigo-600" />{" "}
              System Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userStats.map((stat) => (
                <div
                  key={stat.role}
                  className={`bg-white shadow rounded-lg p-6 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200`}
                >
                  <Users className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-gray-600 font-medium">{stat.role}</p>
                    <p className="text-xl font-semibold text-blue-700">
                      {stat.count}
                    </p>
                  </div>
                </div>
              ))}

              <div
                className={`bg-white shadow rounded-lg p-6 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200`}
              >
                <Book className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-gray-600 font-medium">Total Courses</p>
                  <p className="text-xl font-semibold text-green-700">
                    {courseStats.total}
                  </p>
                </div>
              </div>

              <div
                className={`bg-white shadow rounded-lg p-6 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200`}
              >
                <Book className="h-8 w-8 text-indigo-500" />
                <div>
                  <p className="text-gray-600 font-medium">Active Courses</p>
                  <p className="text-xl font-semibold text-indigo-700">
                    {courseStats.active}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Registrations Section */}
            <section
              className={`bg-white shadow rounded-lg p-6 ${fadeInClass} ${transitionClass} delay-200`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  <UserPlus className="inline-block mr-2 align-middle h-6 w-6 text-yellow-500" />{" "}
                  Recent Registrations
                </h2>
                <a
                  href="/admin/users"
                  className="text-indigo-500 hover:underline text-sm font-medium"
                >
                  View All Users
                </a>
              </div>
              <ul className="divide-y divide-gray-200">
                {recentRegistrations.map((reg) => (
                  <li
                    key={reg.name}
                    className="py-3 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700 font-medium">{reg.name}</p>
                        <p className="text-sm text-gray-500">
                          {reg.role} - Registered on {reg.date}
                        </p>
                      </div>
                      <UserPlus className="h-5 w-5 text-gray-400" />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* System Overview Section */}
            <section
              className={`bg-white shadow rounded-lg p-6 ${fadeInClass} ${transitionClass} delay-300`}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                <Settings className="inline-block mr-2 align-middle h-6 w-6 text-green-500" />{" "}
                System Health
              </h2>
              <ul className="divide-y divide-gray-200">
                {systemOverview.map((item) => (
                  <li
                    key={item.label}
                    className="py-3 flex justify-between items-center"
                  >
                    <p className="text-gray-700 font-medium">{item.label}</p>
                    <span className={`text-sm font-semibold ${item.color}`}>
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="/admin/settings"
                className="text-indigo-500 hover:underline mt-4 block text-sm font-medium"
              >
                System Settings
              </a>
            </section>
          </div>

          {/* Bottom Section */}
          <div
            className={`mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${fadeInClass} ${transitionClass} delay-400`}
          >
            {/* Quick Actions */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                ⚡ Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2 transition-colors duration-200">
                  <UserPlus className="h-5 w-5" />
                  <span>Add User</span>
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2 transition-colors duration-200">
                  <Book className="h-5 w-5" />
                  <span>New Course</span>
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2 transition-colors duration-200">
                  <Bell
                    className="h-5 w-5 animate-shake"
                    style={{ animationIterationCount: 1 }}
                  />
                  <span>Announce!</span>
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2 transition-colors duration-200">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule</span>
                </button>
              </div>
            </section>

            {/* System Logs */}
            <section className="bg-white shadow rounded-lg p-6 md:col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📜 System Logs
              </h2>
              <ul className="text-sm text-gray-600 overflow-y-auto max-h-48">
                <li className="py-1">
                  User{" "}
                  <span className="font-semibold text-blue-500">Admin1</span>{" "}
                  logged in at 14:30
                </li>
                <li className="py-1">
                  Course{" "}
                  <span className="font-semibold text-green-500">Math 101</span>{" "}
                  updated at 14:15
                </li>
                <li className="py-1">
                  New user{" "}
                  <span className="font-semibold text-yellow-600">
                    Student4
                  </span>{" "}
                  registered at 14:00
                </li>
                <li className="py-1">
                  Database backup{" "}
                  <span className="font-semibold text-gray-400">initiated</span>{" "}
                  at 13:45
                </li>
                <li className="py-1">
                  Security alert:{" "}
                  <span className="font-semibold text-red-600">
                    Potential intrusion
                  </span>{" "}
                  at 13:30
                </li>
              </ul>
              <a
                href="/admin/logs"
                className="text-indigo-500 hover:underline mt-4 block text-sm font-medium"
              >
                Full Logs{" "}
                <span className="text-gray-400 ml-1">
                  <ChevronsRight />
                </span>
              </a>
            </section>

            {/* Settings Overview */}
            <section className="bg-white shadow rounded-lg p-6 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                ⚙️ Settings
              </h2>
              <ul className="text-sm text-gray-600">
                <li className="mb-2 flex items-center space-x-2 hover:text-indigo-500 transition-colors duration-150">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>General</span>
                </li>
                <li className="mb-2 flex items-center space-x-2 hover:text-indigo-500 transition-colors duration-150">
                  <Layout className="h-4 w-4 text-gray-400" />
                  <span>Theme</span>
                </li>
                <li className="mb-2 flex items-center space-x-2 hover:text-indigo-500 transition-colors duration-150">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>Users</span>
                </li>
                <li className="mb-2 flex items-center space-x-2 hover:text-indigo-500 transition-colors duration-150">
                  <Book className="h-4 w-4 text-gray-400" />
                  <span>Courses</span>
                </li>
              </ul>
              <a
                href="/admin/settings"
                className="text-indigo-500 hover:underline mt-4 block text-sm font-medium"
              >
                Manage{" "}
                <span className="text-gray-400 ml-1">
                  <ChevronsRight />
                </span>
              </a>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

// import React from 'react';
// import { Users, UserPlus, Book, Calendar, Settings, Layout, Bell } from 'lucide-react';

// interface UserStat {
//   role: string;
//   count: number;
// }

// interface CourseStat {
//   total: number;
//   active: number;
// }

// interface AdminDashboardProps {}

// const AdminDashboard: React.FunctionComponent<AdminDashboardProps> = () => {
//   const userStats: UserStat[] = [
//     { role: 'Students', count: 250 },
//     { role: 'Teachers', count: 35 },
//     { role: 'Admins', count: 5 },
//   ];

//   const courseStats: CourseStat = {
//     total: 120,
//     active: 105,
//   };

//   const recentRegistrations: { name: string; role: string; date: string }[] = [
//     { name: 'Luna Lovegood', role: 'Student', date: '2025-05-02' },
//     { name: 'Severus Snape Jr.', role: 'Teacher', date: '2025-05-01' },
//     { name: 'Albus Dumbledore II', role: 'Admin', date: '2025-04-30' },
//     { name: 'Cho Chang', role: 'Student', date: '2025-04-29' },
//   ];

//   const systemOverview = [
//     { label: 'Server Status', value: 'Online', color: 'text-green-500' },
//     { label: 'Database Health', value: 'Good', color: 'text-green-500' },
//     { label: 'Active Sessions', value: '42', color: 'text-blue-500' },
//     { label: 'Pending Reports', value: '3', color: 'text-yellow-500' },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen py-8">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <header className="bg-white shadow rounded-lg p-6 mb-8">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Admin Dashboard
//           </h1>
//           <p className="text-sm text-gray-500">System Overview and Management</p>
//         </header>

//         {/* Overview Section */}
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">System Overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* User Statistics Cards */}
//             {userStats.map((stat) => (
//               <div key={stat.role} className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
//                 <Users className="h-8 w-8 text-blue-500" />
//                 <div>
//                   <p className="text-gray-600 font-medium">{stat.role}</p>
//                   <p className="text-xl font-semibold text-blue-700">{stat.count}</p>
//                 </div>
//               </div>
//             ))}

//             {/* Course Statistics Card */}
//             <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
//               <Book className="h-8 w-8 text-green-500" />
//               <div>
//                 <p className="text-gray-600 font-medium">Total Courses</p>
//                 <p className="text-xl font-semibold text-green-700">{courseStats.total}</p>
//               </div>
//             </div>

//             {/* Active Courses Card */}
//             <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
//               <Book className="h-8 w-8 text-indigo-500" />
//               <div>
//                 <p className="text-gray-600 font-medium">Active Courses</p>
//                 <p className="text-xl font-semibold text-indigo-700">{courseStats.active}</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Recent Registrations Section */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">Recent Registrations</h2>
//               <a href="/admin/users" className="text-indigo-500 hover:underline text-sm font-medium">View All Users</a>
//             </div>
//             <ul className="divide-y divide-gray-200">
//               {recentRegistrations.map((reg) => (
//                 <li key={reg.name} className="py-3">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-gray-700 font-medium">{reg.name}</p>
//                       <p className="text-sm text-gray-500">{reg.role} - Registered on {reg.date}</p>
//                     </div>
//                     <UserPlus className="h-5 w-5 text-gray-400" />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* System Overview Section */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">System Overview</h2>
//             <ul className="divide-y divide-gray-200">
//               {systemOverview.map((item) => (
//                 <li key={item.label} className="py-3 flex justify-between items-center">
//                   <p className="text-gray-700 font-medium">{item.label}</p>
//                   <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
//                 </li>
//               ))}
//             </ul>
//             <a href="/admin/settings" className="text-indigo-500 hover:underline mt-4 block text-sm font-medium">System Settings</a>
//           </section>
//         </div>

//         {/* Bottom Section */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Quick Actions */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2">
//                 <UserPlus className="h-5 w-5" />
//                 <span>Add New User</span>
//               </button>
//               <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2">
//                 <Book className="h-5 w-5" />
//                 <span>Create New Course</span>
//               </button>
//               <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2">
//                 <Bell className="h-5 w-5" />
//                 <span>Make Announcement</span>
//               </button>
//               <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2">
//                 <Calendar className="h-5 w-5" />
//                 <span>Schedule Event</span>
//               </button>
//             </div>
//           </section>

//           {/* System Logs (Example - more complex in reality) */}
//           <section className="bg-white shadow rounded-lg p-6 md:col-span-2 lg:col-span-1">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">System Logs</h2>
//             <ul className="text-sm text-gray-600 overflow-y-auto max-h-48">
//               <li>User 'Admin1' logged in at 14:30</li>
//               <li>Course 'Math 101' updated at 14:15</li>
//               <li>New user 'Student4' registered at 14:00</li>
//               {/* More log entries */}
//             </ul>
//             <a href="/admin/logs" className="text-indigo-500 hover:underline mt-4 block text-sm font-medium">View Full Logs</a>
//           </section>

//           {/* Settings Overview */}
//           <section className="bg-white shadow rounded-lg p-6 lg:col-span-1">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings Overview</h2>
//             <ul className="text-sm text-gray-600">
//               <li className="mb-2 flex items-center space-x-2">
//                 <Settings className="h-4 w-4 text-gray-400" />
//                 <span>General Settings</span>
//               </li>
//               <li className="mb-2 flex items-center space-x-2">
//                 <Layout className="h-4 w-4 text-gray-400" />
//                 <span>Theme Configuration</span>
//               </li>
//               <li className="mb-2 flex items-center space-x-2">
//                 <Users className="h-4 w-4 text-gray-400" />
//                 <span>User Management</span>
//               </li>
//               {/* More settings items */}
//             </ul>
//             <a href="/admin/settings" className="text-indigo-500 hover:underline mt-4 block text-sm font-medium">Manage Settings</a>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// "use client";

// import { Button } from "@/components/ui/button";
// import AdminLayout from "@/components/AdminLayout";
// import LoginInfo from "@/components/LoginInfo";
// import Loading from "@/components/Loading";
// import Error from "@/components/Error";
// import CookiePage from "@/components/CookiePage";

// // Reusable DashboardCard component
// interface DashboardCardProps {
//   title: string;
//   value: number | string;
//   className?: string;
// }

// function DashboardCard({ title, value, className = "" }: DashboardCardProps) {
//   return (
//     <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
//       <h2 className="font-semibold text-lg">{title}</h2>
//       <p className="text-2xl">{value}</p>
//     </div>
//   );
// }

// export default function AdminDashboard() {
//   // const [isModalOpen, setIsModalOpen] = useState(false);
//   const { user: userData, error, isLoading } = LoginInfo();

//   // Handle Add New button click (example: open modal)
//   const handleAddNew = () => {
//     console.log("Add New button clicked");
//     // setIsModalOpen(true);
//     // Implement modal or form logic here
//   };

//   return (
//     <AdminLayout>
//       {isLoading ? (
//         <Loading size="md" />
//       ) : error ? (
//         <Error error={error.message || "Error loading data"} />
//       ) : (
//         <div className="w-full px-6 md:px-10 py-6">
//           <CookiePage />
//           {/* Header Section */}
//           <header className="flex items-center justify-end flex-wrap gap-2 mb-6">
//             <Button variant="custom" size="lg" onClick={handleAddNew}>
//               Add New
//             </Button>
//           </header>

//           {/* Welcome Section */}
//           <section className="grid grid-cols-1 gap-4 mb-6">
//             <div className="p-4">
//               <h2 className="font-semibold text-2xl">
//                 Hello {userData?.name || ""}
//               </h2>
//             </div>
//           </section>

//           {/* Stats Section */}
//           <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//             <DashboardCard title="Total Students" value={57} />
//             <DashboardCard title="Total Courses" value={30} />
//             <DashboardCard title="New Enrollments" value={30} />
//           </section>

//           {/* Recent Activities Section */}
//           <section className="mt-6">
//             <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
//             <div className="overflow-x-auto">
//               <table
//                 className="min-w-full bg-white border border-gray-200"
//                 aria-label="Recent activities"
//               >
//                 <thead>
//                   <tr>
//                     <th className="py-2 px-4 border-b border-gray-200 text-left">
//                       Activity
//                     </th>
//                     <th className="py-2 px-4 border-b border-gray-200 text-left">
//                       Date
//                     </th>
//                     <th className="py-2 px-4 border-b border-gray-200 text-left">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td colSpan={3} className="py-2 px-4 text-center">
//                       No recent activities
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         </div>
//       )}
//     </AdminLayout>
//   );
// }
