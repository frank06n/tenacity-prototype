'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <Image 
                  src="/images/logo.png"
                  alt="Events Site Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-purple-600">EventSpace</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/events" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 font-medium"
            >
              Events
            </Link>
            <Link 
              href="/profile" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 font-medium"
            >
              Profile
            </Link>
            <Link 
              href="/profile" 
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Sign In
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 p-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-4 space-y-1 px-4">
          <Link 
            href="/" 
            className="block text-gray-700 hover:text-purple-600 px-3 py-2 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/events" 
            className="block text-gray-700 hover:text-purple-600 px-3 py-2 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>
          <Link 
            href="/profile" 
            className="block text-gray-700 hover:text-purple-600 px-3 py-2 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <Link 
            href="/profile" 
            className="block bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}