import { IUserOrAdmin } from './users.dto';

export interface IAuthState {
  userData: userData;
  status: string;
}

export interface userData {
  admin: IAdmin | null;
  token: string | null;
}

export interface authParams {
  phone: string;
  password: string;
}

export interface IAdmin {
  id: string;
  phone: string;
  email: string;
  password: string;
  name: string;
  role: string;
  token: string;
}
