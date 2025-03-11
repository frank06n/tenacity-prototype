// src/app/events/[id]/page.tsx
'use client';

import { useState } from 'react';
import RootLayout from '@/components/layout/RootLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, MapPinIcon, Clock, ShareIcon } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

// Mock event data
const events = [
    {
        id: '1',
        title: 'Tech Conference 2025',
        description: 'Join us for the biggest tech conference of the year. Network with industry experts and learn about the latest technologies.',
        longDescription: `
      <p>Welcome to the Tech Conference 2025, where innovation meets opportunity! This three-day event brings together the brightest minds in technology to share insights, showcase new products, and shape the future of the industry.</p>
      
      <h3>What to Expect:</h3>
      <ul>
        <li>Keynote speeches from industry leaders</li>
        <li>Hands-on workshops on cutting-edge technologies</li>
        <li>Networking sessions with peers and potential collaborators</li>
        <li>Exhibition hall featuring the latest products and services</li>
        <li>Career fair with top tech companies</li>
      </ul>
      
      <h3>Who Should Attend:</h3>
      <p>This conference is perfect for developers, engineers, product managers, entrepreneurs, and anyone interested in the future of technology. Whether you're a seasoned professional or just starting your tech journey, there's something valuable for everyone.</p>
      
      <h3>Registration Details:</h3>
      <p>Registration includes access to all conference sessions, workshops, the exhibition hall, networking events, and complimentary meals. Early bird pricing is available until March 1, 2025.</p>
    `,
        date: 'Apr 15-17, 2025',
        time: '9:00 AM - 6:00 PM',
        location: 'Moscone Center, San Francisco, CA',
        imageUrl: '/images/tech-conference.webp',
        category: 'Technology',
        featured: true,
        organizerName: 'TechEvents Inc.',
        price: '$499',
        capacity: 2000,
        registrationType: 'individual',
        faqs: [
            {
                question: 'Is there a student discount available?',
                answer: 'Yes, students can receive a 50% discount with valid student ID.'
            },
            {
                question: 'Will the sessions be recorded?',
                answer: 'Yes, all main sessions will be recorded and available to registered attendees for 3 months after the event.'
            },
            {
                question: 'What\'s the cancellation policy?',
                answer: 'Full refunds are available up to 30 days before the event. 50% refund up to 14 days before.'
            }
        ]
    },
    // Other events would be defined here
];

export default function EventPage() {
    const params = useParams();
    const id = params?.id as string;

    // Find the current event based on the ID
    const event = events.find(e => e.id === id) || events[0]; // Fallback to first event if not found

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTeamRegistration, setIsTeamRegistration] = useState(false);
    const [teamMembers, setTeamMembers] = useState([{ name: '', email: '' }]);

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, { name: '', email: '' }]);
    };

    return (
        <RootLayout>
            {/* Event Banner */}
            <div className="relative h-64 md:h-96 w-full">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="container py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Event Details - Left Column */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Badge className="mb-2">{event.category}</Badge>
                            <h1 className="text-3xl font-bold tracking-tight mb-4">{event.title}</h1>

                            <div className="flex flex-col md:flex-row gap-6 mb-8">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <CalendarIcon className="h-5 w-5" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-5 w-5" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPinIcon className="h-5 w-5" />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <div className="prose prose-zinc dark:prose-invert max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: event.longDescription }} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Registration - Right Column */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="rounded-lg border bg-card text-card-foreground shadow p-6"
                        >
                            <h3 className="text-lg font-semibold mb-4">Event Details</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Price:</span>
                                    <span className="font-medium">{event.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Organizer:</span>
                                    <span className="font-medium">{event.organizerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Capacity:</span>
                                    <span className="font-medium">{event.capacity} attendees</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Registration:</span>
                                    <span className="font-medium capitalize">{event.registrationType}</span>
                                </div>
                            </div>

                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full mt-6">Register Now</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Register for {event.title}</DialogTitle>
                                        <DialogDescription>
                                            Fill in your details to secure your spot at this event.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" placeholder="Enter your full name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="Enter your email" />
                                        </div>

                                        {event.registrationType === 'individual' ? (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="team-registration"
                                                    checked={isTeamRegistration}
                                                    onCheckedChange={(checked) => setIsTeamRegistration(checked as boolean)}
                                                />
                                                <Label htmlFor="team-registration">Register as a team</Label>
                                            </div>
                                        ) : null}

                                        {isTeamRegistration && (
                                            <div className="space-y-4 border-t pt-4">
                                                <h4 className="font-medium">Team Members</h4>
                                                {teamMembers.map((member, index) => (
                                                    <div key={index} className="space-y-2">
                                                        <Label>Team Member {index + 1}</Label>
                                                        <Input placeholder="Name" className="mb-2" />
                                                        <Input type="email" placeholder="Email" />
                                                    </div>
                                                ))}
                                                <Button type="button" variant="outline" onClick={addTeamMember}>
                                                    Add Team Member
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit">
                                            Complete Registration
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </motion.div>

                        {/* FAQs Section */}
                        {event.faqs && event.faqs.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="rounded-lg border bg-card text-card-foreground shadow p-6"
                            >
                                <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                                <div className="space-y-4">
                                    {event.faqs.map((faq, index) => (
                                        <div key={index}>
                                            <h4 className="font-medium">{faq.question}</h4>
                                            <p className="text-muted-foreground">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Share Button */}
                        <Button variant="outline" className="w-full gap-2">
                            <ShareIcon className="h-4 w-4" />
                            Share Event
                        </Button>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
}