'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample event data (you'd typically fetch this based on the ID parameter)
const eventData = {
  id: 1,
  title: 'Tech Conference 2025',
  date: 'April 15-17, 2025',
  time: '9:00 AM - 6:00 PM',
  location: 'Convention Center, 123 Tech Blvd, San Francisco, CA',
  description: `Join us for the biggest tech conference of the year featuring keynotes from industry leaders.
  
  This three-day event will include workshops, networking opportunities, and presentations on the latest
  technology trends and innovations. Whether you're a developer, designer, entrepreneur, or tech enthusiast,
  there's something for everyone at this conference.
  
  Sessions will cover topics including:
  - Artificial Intelligence and Machine Learning
  - Web Development and Design
  - Blockchain and Cryptocurrency
  - Cybersecurity
  - Virtual and Augmented Reality
  
  Registration includes access to all sessions, lunch each day, and an invitation to the networking reception.`,
  image: '/images/event1.jpg',
  registrationType: 'Solo',
};

export default function EventPage({ params }: { params: { id: string } }) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    teamName: '',
    teamMembers: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    console.log('Registration submitted:', formData);
    setShowRegistrationModal(false);
    alert('Registration successful!');
  };

  return (
    <main className="min-h-screen pb-16">
      {/* Event Banner */}
      <div className="relative h-64 md:h-96 w-full">
        <Image 
          src={eventData.image}
          alt={eventData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Event Details */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{eventData.title}</h1>
          
          <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-6 space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{eventData.date}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{eventData.time}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{eventData.location}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">About This Event</h2>
            <div className="text-gray-700 whitespace-pre-line">
              {eventData.description}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Registration Information</h2>
            <p className="text-gray-700 mb-2">
              Registration Type: <span className="font-medium">{eventData.registrationType}</span>
            </p>
          </div>
          
          <button
            onClick={() => setShowRegistrationModal(true)}
            className="w-full md:w-auto px-8 py-4 bg-purple-600 text-white font-bold rounded-lg text-lg hover:bg-purple-700 transition-colors"
          >
            Register Now
          </button>
        </div>
      </div>
      
      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Register for {eventData.title}</h2>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                {eventData.registrationType === 'Team' && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="teamName" className="block text-gray-700 font-medium mb-2">
                        Team Name
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="teamMembers" className="block text-gray-700 font-medium mb-2">
                        Team Members (email addresses, separated by commas)
                      </label>
                      <textarea
                        id="teamMembers"
                        name="teamMembers"
                        value={formData.teamMembers}
                        onChange={handleInputChange}
                        rows={3}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </>
                )}
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}