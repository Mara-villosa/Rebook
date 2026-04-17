export const environment = {
  api: {
    url: 'http://localhost:8080/Rebook-Backend/api.php',
    key: 'd6o06RFU8bwKUGftmVQ2Caj9OHarGZdN',
    endpoints: {
      public: {
        login: '/login',
        signup: '/signup',
        refreshToken: '/refresh',

        // LIBROS PUBLICOS
        getAllBooks: '/books',
        getBooksFromCategory: '/books/category',
        getBookDetails: '/books/details',
      },
      private: {
        updateUser: '/user',

        // LIBROS PRIVADOS
        uploadBook: '/book/upload',
        deleteBook: '/book/delete',
        getAllBooksFromUser: '/book/user',

        // ALQUILER
        rentBook: '/rent',
        getRentedFromUser: '/rent/user',
        checkRent: '/rent/check',
        extendRent: '/rent/extend',
        returnRentedBook: '/rent/return',
      },
    },
  },
};
