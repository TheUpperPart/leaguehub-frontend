export interface Login {
  accessToken: string;
  refreshToken: string;
  success: true;
}

export interface LoginFail {
  success: false;
}
