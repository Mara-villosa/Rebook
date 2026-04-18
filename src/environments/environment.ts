export const environment = {
  api: {
    url: 'http://localhost:8080/Rebook-Backend/api.php',
    key: 'd6o06RFU8bwKUGftmVQ2Caj9OHarGZdN',
    endpoints: {
      public: {
        login: '/login',
        signup: '/signup',
        refreshToken: '/refresh',
        getBookDetails: '/books/getBook',
        getBooksFromCategory: '/books/category',
        getAllBooks: '/books/getAllBooks',
      },
      private: {
        updateUser: '/user',
        uploadBook: '/books/new',
        deleteBook: '/books/delete',
        getAllBooksFromUser: '/books/getFromUser',
        rentBook: '/rent',
        getRentedFromUser: '/rent/get',
        checkRent: '/rent/check',
        extendRent: '/rent/extend',
        returnRentedBook: '/rent/return',
        addBookToFavs: '/fav/add',
        removeBookFromFavs: '/fav/remove',
        getFavBooks: '/fav/get',
        addToCart: '/cart/add',
        removeFromCart: '/cart/remove',
        getCart: '/cart/get',
        buyCart: '/cart/buy',
      },
    },
  },
};
