export type FieldType = {
  username?: string;
  password?: string;
};

export interface loginInterface {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface userInterface {
  accessToken: string;
  email: string;
  firstName: string;
  gender: string;
  id: 1;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
}
