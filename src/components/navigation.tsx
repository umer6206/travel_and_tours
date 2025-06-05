'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/destinations', label: 'Destinations', icon: '🗺️' },
    { href: '/gallery', label: 'Gallery', icon: '📸' },
    { href: '/offers', label: 'Offers', icon: '🎁' },
    { href: '/contact', label: 'Contact', icon: '📞' },
  ];

  const authItems = session ? [
    { href: '/profile', label: 'Profile', icon: '👤' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    ...(session.user?.role === 'admin' ? [{ href: '/admin', label: 'Admin', icon: '⚙️' }] : []),
  ] : [
    { href: '/auth/signin', label: 'Sign In', icon: '🔑' },
    { href: '/auth/signup', label: 'Sign Up', icon: '✨' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg transform group-hover:scale-110 transition-transform duration-300">
                  GB
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GB Tours
                </span>
                <p className="text-xs text-gray-500 -mt-1">Explore the World</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {pathname === item.href && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              ))}
              
              {/* Separator */}
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-3"></div>
              
              {authItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                </Link>
              ))}
              
              {session && (
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-full text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>🚪</span>
                  <span>Sign Out</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span className={`absolute block w-5 h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-2' : 'top-1'
                }`}></span>
                <span className={`absolute block w-5 h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'top-2'
                }`}></span>
                <span className={`absolute block w-5 h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-2' : 'top-3'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-500 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Menu Header */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold">
                  GB
                </div>
                <div>
                  <h3 className="font-bold text-lg">GB Tours</h3>
                  <p className="text-blue-100 text-sm">Explore the World</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Menu Content */}
          <div className="overflow-y-auto h-full pb-20">
            {/* Navigation Items */}
            <div className="p-6">
              <h4 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-4">Navigation</h4>
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: isMenuOpen ? 'slideInRight 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {pathname === item.href && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Items */}
            <div className="px-6 pb-6">
              <h4 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-4">Account</h4>
              <div className="space-y-2">
                {authItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                    style={{ 
                      animationDelay: `${(navItems.length + index) * 100}ms`,
                      animation: isMenuOpen ? 'slideInRight 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                
                {session && (
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-4 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-2xl">🚪</span>
                    <span className="font-medium">Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add some CSS animations */}
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  );
}