'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovering, setIsHovering] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      color: 'hover:text-blue-500'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'hover:text-pink-500'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      color: 'hover:text-blue-400'
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { href: '/destinations', label: 'Destinations', icon: '🗺️' },
    { href: '/gallery', label: 'Gallery', icon: '📸' },
    { href: '/offers', label: 'Special Offers', icon: '🎁' },
    { href: '/contact', label: 'Contact Us', icon: '📞' },
    { href: '/about', label: 'About Us', icon: 'ℹ️' },
    { href: '/blog', label: 'Travel Blog', icon: '✍️' }
  ];

  const destinations = [
    { href: '/destinations/hunza-valley', label: 'Hunza Valley', icon: '🏔️' },
    { href: '/destinations/k2', label: 'K2 Base Camp', icon: '⛰️' },
    { href: '/destinations/skardu', label: 'Skardu', icon: '🏞️' },
    { href: '/destinations/gilgit', label: 'Gilgit', icon: '🌄' },
    { href: '/destinations/fairy-meadows', label: 'Fairy Meadows', icon: '🧚' },
    { href: '/destinations/deosai', label: 'Deosai Plains', icon: '🌺' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-16 h-16 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Mountain Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent">
        <svg
          className="absolute bottom-0 w-full h-32 text-black/10"
          fill="currentColor"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,120 L50,100 L100,80 L200,90 L300,70 L400,85 L500,60 L600,75 L700,50 L800,65 L900,45 L1000,60 L1100,40 L1200,55 L1200,120 Z"></path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto py-16 px-4 md:px-8">
        {/* Top Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform hover:scale-110 transition-all duration-300">
                GB
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                GB Tours
              </h2>
              <p className="text-blue-200 text-sm">Explore the World with Us</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner in exploring the breathtaking wonders of Gilgit-Baltistan. 
            Creating unforgettable memories, one adventure at a time. 🏔️
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Quick Links */}
          <div className="group">
            <h3 className="text-2xl font-bold mb-6 text-blue-300 flex items-center group-hover:text-blue-200 transition-colors">
              <span className="mr-2">🚀</span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.href} style={{ animationDelay: `${index * 100}ms` }}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 group/link"
                    onMouseEnter={() => setIsHovering(link.href)}
                    onMouseLeave={() => setIsHovering('')}
                  >
                    <span className="text-lg group-hover/link:scale-125 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="group-hover/link:font-medium transition-all duration-300">
                      {link.label}
                    </span>
                    <span className={`opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 ${
                      isHovering === link.href ? 'text-blue-400' : ''
                    }`}>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="group">
            <h3 className="text-2xl font-bold mb-6 text-purple-300 flex items-center group-hover:text-purple-200 transition-colors">
              <span className="mr-2">🏔️</span>
              Popular Destinations
            </h3>
            <ul className="space-y-3">
              {destinations.map((destination, index) => (
                <li key={destination.href} style={{ animationDelay: `${index * 100}ms` }}>
                  <Link
                    href={destination.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 group/link"
                    onMouseEnter={() => setIsHovering(destination.href)}
                    onMouseLeave={() => setIsHovering('')}
                  >
                    <span className="text-lg group-hover/link:scale-125 transition-transform duration-300">
                      {destination.icon}
                    </span>
                    <span className="group-hover/link:font-medium transition-all duration-300">
                      {destination.label}
                    </span>
                    <span className={`opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 ${
                      isHovering === destination.href ? 'text-purple-400' : ''
                    }`}>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="group">
            <h3 className="text-2xl font-bold mb-6 text-green-300 flex items-center group-hover:text-green-200 transition-colors">
              <span className="mr-2">📍</span>
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors duration-300">
                <span className="text-xl mt-1">📍</span>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-gray-400">Gilgit, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors duration-300">
                <span className="text-xl mt-1">📞</span>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-gray-400">+92 300 1234567</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors duration-300">
                <span className="text-xl mt-1">✉️</span>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-400">info@gbtours.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors duration-300">
                <span className="text-xl mt-1">⏰</span>
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-sm text-gray-400">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="group">
            <h3 className="text-2xl font-bold mb-6 text-pink-300 flex items-center group-hover:text-pink-200 transition-colors">
              <span className="mr-2">💌</span>
              Stay Connected
            </h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Subscribe to our newsletter for exclusive travel deals, destination guides, and adventure stories! 
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-white placeholder-gray-300 transition-all duration-300"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 font-medium shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Subscribe Now</span>
                  <span className="text-lg">🚀</span>
                </button>
              </form>
            ) : (
              <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-green-300 font-medium">Successfully Subscribed!</p>
                <p className="text-green-200 text-sm mt-1">Welcome to GB Tours family!</p>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col items-center space-y-6">
            <h4 className="text-xl font-semibold text-gray-300">Follow Our Journey</h4>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 ${social.color} transform hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-lg`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  title={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 flex items-center">
              <span className="mr-2">©</span>
              {new Date().getFullYear()} GB Tours. All rights reserved.
              <span className="ml-2">🇵🇰</span>
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <div className="mt-4 text-gray-500 text-xs">
            Made with ❤️ for adventurers who dare to explore
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}