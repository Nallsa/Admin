export interface IUsersAndAdminsState {
  users: IUserOrAdmin[];
  admins: IUserOrAdmin[];
}

export interface IUserOrAdmin {
  id?: string | null;
  parentId?: string | null;
  phone: string | null;
  email: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role?: string | null;
  isActive?: boolean | null;
}
