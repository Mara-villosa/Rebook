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

export interface DeleteBookRequest {
  book_id: number;
}

export interface GetAllBooksRequest {
  books: {
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
  }[];
}
