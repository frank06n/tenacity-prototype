import Image from 'next/image';
import Link from 'next/link';

// Sample event data (you'd typically fetch this from an API)
const featuredEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    date: 'April 15-17, 2025',
    description: 'Join us for the biggest tech conference of the year featuring keynotes from industry leaders.',
    image: '/images/event1.jpg',
  },
  {
    id: 2,
    title: 'Music Festival',
    date: 'May 20-22, 2025',
    description: 'Three days of amazing performances from top artists across multiple stages.',
    image: '/images/event2.jpg',
  },
  {
    id: 3,
    title: 'Hackathon Challenge',
    date: 'June 5-6, 2025',
    description: 'Put your coding skills to the test in this 24-hour hackathon with great prizes.',
    image: '/images/event3.jpg',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 md:h-screen max-h-[800px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 to-purple-600">
          {/* This would be replaced with an actual background image */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="z-10 text-center px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Events</h1>
          <p className="text-xl md:text-2xl mb-8">Find and join the most exciting events happening around you</p>
          <Link 
            href="/events" 
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full text-lg hover:bg-gray-100 transition-colors"
          >
            Explore Events
          </Link>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
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
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
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
      </section>
    </main>
  );
}