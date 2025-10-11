'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaEnvelope, FaBed, FaBriefcase, FaUsers, FaSignOutAlt, FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const menuItems = [
    { href: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
    { href: '/admin/dashboard/contacts', icon: FaEnvelope, label: 'Contact Submissions' },
    { href: '/admin/dashboard/bookings', icon: FaBed, label: 'Room Bookings' },
    { href: '/admin/dashboard/jobs', icon: FaBriefcase, label: 'Job Applications' },
    { href: '/admin/dashboard/permits', icon: FaFileAlt, label: 'Permit Management' },
    { href: '/admin/dashboard/users', icon: FaUsers, label: 'User Management' },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden mr-4 text-gray-600 hover:text-gray-900"
              >
                {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
              <div className="relative w-40 h-10">
                <Image
                  src="/logo.webp"
                  alt="THEATRE HOTEL d.o.o."
                  fill
                  className="object-contain"
                />
              </div>
              <span className="ml-4 text-lg font-semibold text-gray-800 hidden sm:block">Admin Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out mt-16 lg:mt-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="h-full overflow-y-auto py-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-6 py-3 transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="text-xl" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden mt-16"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
