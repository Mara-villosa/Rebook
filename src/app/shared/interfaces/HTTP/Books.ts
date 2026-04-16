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

// /books/category
export interface GetAllBooksFromCategoryRequest {
  category: string;
}
export interface GetAllBooksFromCategoryResponse {
  books: BookDTO[];
}

// /books/getBook
export interface GetBookDetailsRequest {
  book_id: number;
}
export interface GetBookDetailsResponse {
  book: BookDTO;
}

// /rent/get
export interface GetRentedBooksFromUserResponse {
  books: BookDTO[];
}

// /rent/rent
export interface RentBookRequest {
  book_id: string;
}

export interface RentBookResponse {
  expiration_date: string;
}

// /rent/extend
export interface ExtendRentRequest {
  book_id: string;
}

// /rent/return
export interface ReturnRentedBookRequest {
  book_id: string;
}

export interface ExtendRentResponse {
  expiration_date: string;
}
//DTO del libro devuelto en la base de datos
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
  rent_expiration_date: string;
  sold: boolean;
}
