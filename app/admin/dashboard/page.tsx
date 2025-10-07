'use client';

import { useSession } from 'next-auth/react';
import { FaEnvelope, FaBed, FaBriefcase, FaUsers } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session } = useSession();

  const stats = [
    {
      title: 'Contact Submissions',
      count: 0,
      icon: FaEnvelope,
      href: '/admin/dashboard/contacts',
      color: 'bg-blue-500',
    },
    {
      title: 'Room Bookings',
      count: 0,
      icon: FaBed,
      href: '/admin/dashboard/bookings',
      color: 'bg-green-500',
    },
    {
      title: 'Job Applications',
      count: 0,
      icon: FaBriefcase,
      href: '/admin/dashboard/jobs',
      color: 'bg-purple-500',
    },
    {
      title: 'Admin Users',
      count: 0,
      icon: FaUsers,
      href: '/admin/dashboard/users',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {session?.user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.count}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon className="text-white text-2xl" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/dashboard/contacts"
              className="block w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-blue-900">View Contact Submissions</p>
              <p className="text-sm text-blue-700">Manage customer inquiries</p>
            </Link>
            <Link
              href="/admin/dashboard/bookings"
              className="block w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-green-900">View Room Bookings</p>
              <p className="text-sm text-green-700">Manage reservations</p>
            </Link>
            <Link
              href="/admin/dashboard/jobs"
              className="block w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-purple-900">View Job Applications</p>
              <p className="text-sm text-purple-700">Review applicants</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
