// /books/new
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

// /books/delete
export interface DeleteBookRequest {
  book_id: number;
}

// /books/getAll
export interface GetAllBooksResponse {
  books: BookDTO[];
}

// /books/getFromUser
export interface GetAllBooksFromUserResponse {
  uploads: BookDTO[];
  rented: BookDTO[];
  bought: BookDTO[];
}
interface BookDTO {
  id: number;
  title: string;
  author: string;
  description: string;
  rentPrice: number;
  sellPrice: number;
  isbn: string;
  url: string;
  category: string;
  rented: boolean;
  inCart: boolean;
  id_user: number;
  rent_expired: boolean;
  sold: boolean;
}
