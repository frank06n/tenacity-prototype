'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample user data (you'd typically fetch this from your authentication system)
const initialUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/images/avatar.jpg',
  bio: 'Web developer and tech enthusiast.',
};

// Sample registered events (you'd typically fetch this from your database)
const registeredEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    date: 'April 15-17, 2025',
    status: 'Confirmed',
    image: '/images/event1.jpg',
  },
  {
    id: 3,
    title: 'Hackathon Challenge',
    date: 'June 5-6, 2025',
    status: 'Pending',
    image: '/images/event3.jpg',
  },
];

export default function ProfilePage() {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialUserData);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your backend
    setUserData(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-12 text-center">Your Profile</h1>
        
        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-purple-200">
                <Image 
                  src={userData.avatar}
                  alt={userData.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Name
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
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
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
                  
                  <div>
                    <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(userData);
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{userData.name}</h2>
                  <p className="text-gray-600 mb-4">{userData.email}</p>
                  <p className="text-gray-700 mb-6">{userData.bio}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Registered Events */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">My Registered Events</h2>
          
          {registeredEvents.length > 0 ? (
            <div className="space-y-4">
              {registeredEvents.map(event => (
                <div key={event.id} className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative h-48 md:h-auto md:w-48 shrink-0">
                    <Image 
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          event.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.date}</p>
                    </div>
                    <div>
                      <Link 
                        href={`/events/${event.id}`}
                        className="inline-block px-4 py-2 bg-purple-600 text-white font-medium rounded hover:bg-purple-700 transition-colors"
                      >
                        View Event
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You haven't registered for any events yet.</p>
              <Link 
                href="/events"
                className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Browse Events
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}