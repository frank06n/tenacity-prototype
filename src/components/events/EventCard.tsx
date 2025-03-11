// src/components/events/EventCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
}

const EventCard = ({ id, title, description, date, location, imageUrl, category, featured }: EventCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
          {featured && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Featured
            </Badge>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{category}</Badge>
          </div>
          <CardTitle className="line-clamp-1 text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 flex-1">
          <CardDescription className="line-clamp-2 mb-2">{description}</CardDescription>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/events/${id}`} className="w-full">
            <Button variant="default" className="w-full">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EventCard;