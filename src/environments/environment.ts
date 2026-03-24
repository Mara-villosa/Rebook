export const environment = {
  api: {
    url: 'http://localhost:8080/Rebook-Backend/api.php',
    key: 'd6o06RFU8bwKUGftmVQ2Caj9OHarGZdN',
    endpoints: {
      public: {
        login: '/login',
        signup: '/signup',
        refreshToken: '/refresh',
      },
      private: {},
    },
  },
};
