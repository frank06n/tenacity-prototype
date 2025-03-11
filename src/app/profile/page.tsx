// src/app/profile/page.tsx
'use client';

import { useState } from 'react';
import RootLayout from '@/components/layout/RootLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardContent, Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, SettingsIcon } from 'lucide-react';

// Mock data for registered events
const registeredEvents = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    date: 'Apr 15-17, 2025',
    location: 'San Francisco, CA',
    imageUrl: '/images/tech-conference.jpg',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    date: 'Jun 5, 2025',
    location: 'New York, NY',
    imageUrl: '/images/startup-pitch.jpg',
    status: 'upcoming'
  },
  {
    id: '10',
    title: 'Virtual Reality Summit',
    date: 'Feb 12-13, 2025',
    location: 'Online',
    imageUrl: '/images/vr-summit.jpg',
    status: 'completed'
  }
];

// Animation variants
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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  console.log(activeTab);
  
  // Mock user data
  const user = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: '/images/avatar.jpg',
    bio: 'Tech enthusiast and event organizer. Love connecting with new people and learning new things.',
    location: 'San Francisco, CA',
    interests: ['Technology', 'Entrepreneurship', 'Music', 'Art'],
  };
  
  return (
    <RootLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile Overview */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="mt-2 text-sm">{user.bio}</p>
                  
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {user.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                  
                  <div className="mt-6 w-full">
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <SettingsIcon className="h-4 w-4" />
                      Account Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right Column - Main Content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs defaultValue="overview" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab Content */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Your Registered Events</h3>
                    
                    <div className="space-y-4">
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                      >
                        {registeredEvents.filter(event => event.status === 'upcoming').map((event) => (
                          <motion.div key={event.id} variants={item}>
                            <Link href={`/events/${event.id}`}>
                              <Card className="overflow-hidden mb-4 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row">
                                  <div className="relative h-32 sm:h-auto sm:w-36 flex-shrink-0">
                                    <Image
                                      src={event.imageUrl}
                                      alt={event.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="p-4 flex-grow">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-semibold">{event.title}</h4>
                                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                          <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4" />
                                            <span>{event.date}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <MapPinIcon className="h-4 w-4" />
                                            <span>{event.location}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <Badge>{event.status}</Badge>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      {registeredEvents.filter(event => event.status === 'upcoming').length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">You haven&apos;t registered for any upcoming events yet.</p>
                          <Button asChild className="mt-4">
                            <Link href="/events">Explore Events</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Past Events</h3>
                      <div className="space-y-4">
                        {registeredEvents.filter(event => event.status === 'completed').map((event) => (
                          <Link key={event.id} href={`/events/${event.id}`}>
                            <Card className="overflow-hidden mb-4 hover:shadow-md transition-shadow opacity-70 hover:opacity-100">
                              <div className="flex flex-col sm:flex-row">
                                <div className="relative h-32 sm:h-auto sm:w-36 flex-shrink-0">
                                  <Image
                                    src={event.imageUrl}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-4 flex-grow">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold">{event.title}</h4>
                                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                          <CalendarIcon className="h-4 w-4" />
                                          <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <MapPinIcon className="h-4 w-4" />
                                          <span>{event.location}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <Badge variant="outline">{event.status}</Badge>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings Tab Content */}
              <TabsContent value="settings">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <h3 className="text-lg font-semibold">Profile Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-center mb-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="text-center mb-6">
                        <Button variant="outline" size="sm">Change Avatar</Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" defaultValue={user.bio} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={user.location} />
                      </div>
                      
                      <div className="pt-4">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-4">Account Security</h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        
                        <div className="pt-4">
                          <Button>Update Password</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span>Email Notifications</span>
                            <span className="text-sm text-muted-foreground">Receive emails about event updates</span>
                          </div>
                          <Checkbox id="email-notifications" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span>SMS Notifications</span>
                            <span className="text-sm text-muted-foreground">Receive text messages about event updates</span>
                          </div>
                          <Checkbox id="sms-notifications" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span>Marketing Communications</span>
                            <span className="text-sm text-muted-foreground">Receive promotional content</span>
                          </div>
                          <Checkbox id="marketing-communications" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </RootLayout>
  );
}