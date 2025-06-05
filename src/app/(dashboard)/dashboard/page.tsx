'use client';

import { motion } from 'framer-motion';
import {
  CalendarIcon,
  HeartIcon,
  PhotoIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Active Bookings',
    value: '2',
    icon: CalendarIcon,
    href: '/dashboard/bookings',
  },
  {
    name: 'Favorites',
    value: '12',
    icon: HeartIcon,
    href: '/dashboard/favorites',
  },
  {
    name: 'Gallery Items',
    value: '8',
    icon: PhotoIcon,
    href: '/dashboard/gallery',
  },
  {
    name: 'Videos',
    value: '3',
    icon: VideoCameraIcon,
    href: '/dashboard/videos',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.a
            key={stat.name}
            href={stat.href}
            variants={item}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bookings */}
        <motion.div
          variants={item}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Bookings
          </h2>
          <div className="space-y-4">
            {/* Add booking list items here */}
            <p className="text-gray-500">No upcoming bookings</p>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={item}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {/* Add activity list items here */}
            <p className="text-gray-500">No recent activity</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 