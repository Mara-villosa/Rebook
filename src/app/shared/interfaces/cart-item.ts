export interface CartItem {
    id: number;
  titulo: string;
  autor: string;
  portada: string;
  price: number;
  type: 'buy' | 'rent';
  returnDate?: string;
  quantity: number;
}
