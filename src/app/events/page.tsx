// src/app/events/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import EventCard, { EventCardProps } from '@/components/events/EventCard';
import RootLayout from '@/components/layout/RootLayout';
import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';

// Mock data for events
const allEvents: EventCardProps[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year. Network with industry experts and learn about the latest technologies.',
    date: 'Apr 15-17, 2025',
    location: 'San Francisco, CA',
    imageUrl: '/images/tech-conference.webp',
    category: 'Technology',
    featured: true
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'A three-day music festival featuring top artists from around the world. Don\'t miss this amazing experience!',
    date: 'May 20-22, 2025',
    location: 'Austin, TX',
    imageUrl: '/images/music-festival.webp',
    category: 'Entertainment',
    featured: true
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    description: 'Watch innovative startups pitch their ideas to investors and compete for funding. Great networking opportunity.',
    date: 'Jun 5, 2025',
    location: 'New York, NY',
    imageUrl: '/images/startup-pitch.webp',
    category: 'Business',
    featured: true
  },
  {
    id: '4',
    title: 'Art Exhibition',
    description: 'Explore contemporary art from emerging artists. This exhibition showcases a diverse range of styles and mediums.',
    date: 'Apr 10-30, 2025',
    location: 'Chicago, IL',
    imageUrl: '/images/art-exhibition.webp',
    category: 'Arts'
  },
  {
    id: '5',
    title: 'Charity Run',
    description: 'Run for a cause! Join this 5K charity run to support local education initiatives. All proceeds go to schools in need.',
    date: 'May 8, 2025',
    location: 'Seattle, WA',
    imageUrl: '/images/charity-run.webp',
    category: 'Sports'
  },
  {
    id: '6',
    title: 'Culinary Workshop',
    description: 'Learn how to cook authentic Italian dishes from a renowned chef. Limited spots available, register soon!',
    date: 'Apr 22, 2025',
    location: 'Boston, MA',
    imageUrl: '/images/culinary-workshop.webp',
    category: 'Food'
  },
  {
    id: '7',
    title: 'Science Fair',
    description: 'A family-friendly event showcasing science projects from local students. Fun activities for all ages!',
    date: 'Jun 12, 2025',
    location: 'Denver, CO',
    imageUrl: '/images/science-fair.webp',
    category: 'Education'
  },
  {
    id: '8',
    title: 'Tech Hackathon',
    description: 'A 48-hour coding challenge to build innovative solutions. Great prizes and networking opportunities.',
    date: 'May 15-17, 2025',
    location: 'Los Angeles, CA',
    imageUrl: '/images/hackathon.webp',
    category: 'Technology'
  },
  {
    id: '9',
    title: 'Career Expo',
    description: 'Connect with leading employers in various industries. Bring your resume and be prepared for on-site interviews.',
    date: 'Jun 20, 2025',
    location: 'Philadelphia, PA',
    imageUrl: '/images/career-expo.webp',
    category: 'Business'
  }
];

// Animation variants for staggered animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Get unique categories for filter
const categories = ['All', ...Array.from(new Set(allEvents.map(event => event.category)))];

export default function EventsPage() {
  return (
    <RootLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Explore Events</h1>
        
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search events..." 
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Select defaultValue="All">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="date">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date: Upcoming</SelectItem>
                <SelectItem value="dateDesc">Date: Latest</SelectItem>
                <SelectItem value="popular">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Events Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {allEvents.map((event) => (
            <motion.div key={event.id} variants={item}>
              <EventCard {...event} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled>
              &lt;
            </Button>
            <Button variant="default" size="icon">1</Button>
            <Button variant="outline" size="icon">2</Button>
            <Button variant="outline" size="icon">3</Button>
            <Button variant="outline" size="icon">
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}