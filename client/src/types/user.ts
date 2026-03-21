export interface IUser {
  id: string;
  email: string;
  displayName: string;
  imageUrl?: any;
  token: string;
}

export interface ILoginCreds {
  email: string;
  password: string;
}

export interface IRegisterCreds {
  email: string;
  displayName: string;
  password: string;
}
