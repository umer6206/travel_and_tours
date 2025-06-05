export interface Destination {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: {
    url: string;
    alt: string;
  }[];
  location: {
    type: 'Point';
    coordinates: number[];
  };
  elevation: number;
  bestTimeToVisit: string;
  activities: string[];
  highlights: string[];
  accommodation: string[];
  region: 'Gilgit' | 'Skardu' | 'Hunza' | 'Other';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
} 