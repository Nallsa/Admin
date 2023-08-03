/* import $api from '../api'; */
import { $api } from '../api';

import { IUserOrAdmin } from '../../dto/users.dto';

export default class UserService {
  //==============Users==========================
  //получаем все
  static async getAllUsers(): Promise<{ data: IUserOrAdmin[] }> {
    return $api.get('/users');
  }
  //создаём юсера админом
  static async createUserAdmin(data: any): Promise<{ data: IUserOrAdmin }> {
    return $api.post('/users/create-admin', data);
  }
  //редактируем
  static async editUserById(
    data: IUserOrAdmin
  ): Promise<{ data: IUserOrAdmin }> {
    return $api.put(`/users/update/${data.id}`, data);
  }
  //удаляем
  static async deleteUserById(id: number): Promise<{ data: any }> {
    return $api.delete(`/users/delete/${id}`);
  }
  //==============Admins==========================

  //получаем все
  static async getAllAdmins(): Promise<{ data: IUserOrAdmin[] }> {
    return $api.get('admins');
  }

  //создаём юсера
  static async createAdmin(data: any): Promise<{ data: IUserOrAdmin }> {
    return $api.post('/register/root', data);
  }

  //редактируем
  static async editAdminById(
    data: IUserOrAdmin
  ): Promise<{ data: IUserOrAdmin }> {
    return $api.put(`/admins/update/${data.id}`, data);
  }

  //удаляем
  static async deleteAdminById(id: number): Promise<{ data: any }> {
    return $api.delete(`/admins/delete/${id}`);
  }
}
