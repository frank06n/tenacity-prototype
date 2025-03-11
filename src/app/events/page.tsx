'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample event data (you'd typically fetch this from an API)
const allEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    date: 'April 15-17, 2025',
    description: 'Join us for the biggest tech conference of the year featuring keynotes from industry leaders.',
    image: '/images/event1.jpg',
    category: 'Technology',
  },
  {
    id: 2,
    title: 'Music Festival',
    date: 'May 20-22, 2025',
    description: 'Three days of amazing performances from top artists across multiple stages.',
    image: '/images/event2.jpg',
    category: 'Music',
  },
  {
    id: 3,
    title: 'Hackathon Challenge',
    date: 'June 5-6, 2025',
    description: 'Put your coding skills to the test in this 24-hour hackathon with great prizes.',
    image: '/images/event3.jpg',
    category: 'Technology',
  },
  {
    id: 4,
    title: 'Art Exhibition',
    date: 'June 15-30, 2025',
    description: 'Experience stunning artwork from renowned artists around the world.',
    image: '/images/event4.jpg',
    category: 'Art',
  },
  {
    id: 5,
    title: 'Food Festival',
    date: 'July 10-12, 2025',
    description: 'Taste delicious cuisines from top chefs and food vendors in one place.',
    image: '/images/event5.jpg',
    category: 'Food',
  },
  {
    id: 6,
    title: 'Business Summit',
    date: 'August 8-10, 2025',
    description: 'Network with industry leaders and learn about the latest business trends.',
    image: '/images/event6.jpg',
    category: 'Business',
  },
];

// Categories for filtering
const categories = ['All', 'Technology', 'Music', 'Art', 'Food', 'Business'];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Filter events based on category and search term
  const filteredEvents = allEvents.filter(event => 
    (selectedCategory === 'All' || event.category === selectedCategory) &&
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Browse Events</h1>
      
      {/* Filter and Search Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>
      
      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48 w-full">
              <Image 
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                  {event.category}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{event.date}</p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <Link 
                href={`/events/${event.id}`}
                className="inline-block px-4 py-2 bg-purple-600 text-white font-medium rounded hover:bg-purple-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-purple-600 text-white'
                    : 'border border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}