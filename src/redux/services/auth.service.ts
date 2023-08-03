/* import $api from '../api'; */
import { $api } from '../api';

import { IUserOrAdmin } from '../../dto/users.dto';
import { authParams, userData } from '../../dto/auth.dto';

export default class AuthService {
  //==============Users==========================

  //создаём юсера админом
  static async fetchRegister(data: IUserOrAdmin): Promise<{ data: userData }> {
    return $api.post(`register/root`, data);
  }
  //редактируем
  static async fetchAuth(data: authParams): Promise<{ data: userData }> {
    return $api.post(`login/admin/`, data);
  }
}


// import { IPromo } from '../../dto/promo.dto';
// import { $api } from '../api';

// export default class PromoService {
//   //==============Users==========================
//   //получаем все
//   static async getAllUsers(): Promise<{ data: IPromo[] }> {
//     return $api.get('/promo');
//   }
//   //создаём юсера админом
//   static async createUserAdmin(data: any): Promise<{ data: IPromo }> {
//     return $api.post('/promo', data);
//   }
//   //редактируем
//   static async editUserById(data: IPromo): Promise<{ data: IPromo }> {
//     return $api.put(`/promo/update/${data.id}`, data);
//   }
//   //удаляем
//   static async deleteUserById(id: number): Promise<{ data: any }> {
//     return $api.delete(`/promo/delete/${id}`);
//   }
// }
