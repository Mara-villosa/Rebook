export interface LogInRequest {
  email: string;
  password: string;
}

export interface LogInResponse {
  user: {
    name: string;
    lastname: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
