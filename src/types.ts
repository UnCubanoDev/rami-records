export type DivisionType = 'entertainment' | 'sport' | 'booking' | 'studio';

export type TabType = 'inicio' | 'artistas' | 'musica' | 'eventos' | 'booking' | 'sport' | 'studio';

export interface SportAthlete {
  id: string;
  name: string;
  sport: 'Boxeo' | 'Béisbol' | 'MMA' | 'Atletismo';
  division: string;
  record?: string;
  ranking?: string;
  origin: string;
  image: string;
  bio: string;
  achievements: string[];
  nextFightOrEvent?: string;
  instagram?: string;
}

export interface StudioRoom {
  id: string;
  name: string;
  type: string;
  console: string;
  monitors: string;
  mics: string[];
  dolbyAtmos: boolean;
  hourlyRate: number;
  image: string;
  features: string[];
}

export interface StudioBookingRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  roomId: string;
  roomName: string;
  date: string;
  timeSlot: string;
  hours: number;
  serviceType: 'Grabación de Voces' | 'Mezcla & Master' | 'Producción Completa' | 'Dolby Atmos';
  projectDetails: string;
  status: 'Confirmada' | 'En Revisión';
  submittedAt: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  category: 'urbano' | 'reparto' | 'reggaeton' | 'alt';
  location: string;
  image: string;
  bio: string;
  monthlyListeners: string;
  topTracks: string[];
  instagram?: string;
  spotify?: string;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  year: number;
  type: 'Single' | 'EP' | 'Album';
  tracksCount?: number;
  coverUrl: string;
  duration: string;
  durationSeconds: number;
  releaseDateText: string;
  featured?: boolean;
  bpm?: number;
}

export interface EventItem {
  id: string;
  title: string;
  artist: string;
  city: 'Havana' | 'Miami' | 'Madrid';
  location: string;
  dateText: string;
  monthBadge: string;
  dayBadge: string;
  time: string;
  status: 'AVAILABLE' | 'SELLING FAST' | 'SOLD OUT' | 'LAST TICKETS';
  statusColor?: string;
  doorsOpen?: string;
  image?: string;
  featured?: boolean;
  price?: string;
}

export interface BookingRequest {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  eventType: string;
  artist: string;
  date: string;
  venue: string;
  capacity?: string;
  budget?: string;
  message?: string;
  status: 'Under Review' | 'Confirmed' | 'Pending';
  submittedAt: string;
}

export interface DemoSubmission {
  id: string;
  artistName: string;
  email: string;
  phone: string;
  genre: string;
  demoUrl: string;
  fileName?: string;
  submittedAt: string;
}
