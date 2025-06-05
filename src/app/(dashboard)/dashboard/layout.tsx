'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  HomeIcon,
  CalendarIcon,
  HeartIcon,
  PhotoIcon,
  VideoCameraIcon,
  UserIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const userSidebarItems = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    href: '/dashboard/bookings',
    label: 'My Bookings',
    icon: <CalendarIcon className="w-5 h-5" />,
  },
  {
    href: '/dashboard/favorites',
    label: 'Favorites',
    icon: <HeartIcon className="w-5 h-5" />,
  },
  {
    href: '/dashboard/gallery',
    label: 'My Gallery',
    icon: <PhotoIcon className="w-5 h-5" />,
  },
  {
    href: '/dashboard/videos',
    label: 'My Videos',
    icon: <VideoCameraIcon className="w-5 h-5" />,
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: <UserIcon className="w-5 h-5" />,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: <CogIcon className="w-5 h-5" />,
  },
];

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout sidebarItems={userSidebarItems}>{children}</DashboardLayout>;
} 