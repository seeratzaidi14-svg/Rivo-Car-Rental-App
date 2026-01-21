import {JSX} from 'react';

export interface ICarComponentProps {
  id?: string;
  name: string;
  pricePerDay: number;
  brand: string;
  location: string;
  image_url: string;
  rating: number;
  review_count: number;
  seats: number;
  fuel_type: string;
  transmission: string
  onPress?: () => void;
  bottomActions?: React.ReactNode;
  [key: string]: any;
}
