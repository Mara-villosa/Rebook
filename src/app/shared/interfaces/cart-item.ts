export interface CartItem {
    id: number;
  titulo: string;
  autor: string;
  portada: string;
  price: number;
  type: 'buy' | 'rent';
  rent_expiration_date: string;
  quantity: number;
}
