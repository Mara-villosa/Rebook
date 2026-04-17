export interface CheckRentedBookRequest {
  id: number;
}

export interface CheckRentedBookResponse {
  expirationDate: string;
}