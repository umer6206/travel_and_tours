'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
}

export function DashboardLayout({ children, sidebarItems }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg"
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back, {session?.user?.name}
          </p>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="ml-64 p-8"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
} 