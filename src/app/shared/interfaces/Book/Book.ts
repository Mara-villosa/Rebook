export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  price?: number;
  condition: 'nuevo' | 'bueno' | 'regular';
  addedDate: Date;
  category: string;
  isRental?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon?: string;
}