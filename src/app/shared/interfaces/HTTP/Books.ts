export interface UploadBookRequest {
  title: string;
  description: string;
  author: string;
  isbn: string;
  url: string;
  category: string;
  rent_price?: number;
  sell_price?: number;
}
