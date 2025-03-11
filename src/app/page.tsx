// src/app/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import EventCard, { EventCardProps } from '@/components/events/EventCard';
import RootLayout from '@/components/layout/RootLayout';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data for featured events
const featuredEvents: EventCardProps[] = [
    {
        id: '1',
        title: 'Tech Conference 2025',
        description: 'Join us for the biggest tech conference of the year. Network with industry experts and learn about the latest technologies.',
        date: 'Apr 15-17, 2025',
        location: 'San Francisco, CA',
        imageUrl: '/images/tech-conference.jpg',
        category: 'Technology',
        featured: true
    },
    {
        id: '2',
        title: 'Music Festival',
        description: 'A three-day music festival featuring top artists from around the world. Don\'t miss this amazing experience!',
        date: 'May 20-22, 2025',
        location: 'Austin, TX',
        imageUrl: '/images/music-festival.jpg',
        category: 'Entertainment',
        featured: true
    },
    {
        id: '3',
        title: 'Startup Pitch Competition',
        description: 'Watch innovative startups pitch their ideas to investors and compete for funding. Great networking opportunity.',
        date: 'Jun 5, 2025',
        location: 'New York, NY',
        imageUrl: '/images/startup-pitch.jpg',
        category: 'Business',
        featured: true
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

export default function Home() {
    return (
        <RootLayout>
            {/* Hero Section */}
            <section className="relative">
                <div className="absolute inset-0 overflow-hidden z-0">
                    <div
                        className="h-full w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                        style={{
                            backgroundImage: "url('/images/hero-bg.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundBlendMode: 'overlay'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
                </div>

                <div className="container relative min-h-[70vh] flex flex-col items-center justify-center text-center z-10 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                            Discover Amazing Events
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <p className="mt-4 max-w-md text-muted-foreground md:text-xl">
                            Find and register for exciting events happening around you. Connect with like-minded people and expand your network.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8"
                    >
                        <Link href="/events">
                            <Button size="lg" className="rounded-full font-semibold">
                                Explore Events
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Events Section */}
            <section className="py-16 bg-muted/50">
                <div className="container">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Featured Events</h2>
                        <p className="text-muted-foreground max-w-md">
                            Check out these exciting events curated just for you.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {featuredEvents.map((event) => (
                            <motion.div key={event.id} variants={item}>
                                <EventCard {...event} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="flex justify-center mt-12">
                        <Link href="/events">
                            <Button variant="outline" size="lg">
                                View All Events
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
}