import { IPromo } from '../../dto/promo.dto';
import { $api } from '../api';

export default class PromoService {
  //==============Promo==========================
  //получаем все
  static async getAllPromo(): Promise<{ data: IPromo[] }> {
    return $api.get('/promo');
  }
  //создаём юсера админом
  static async createPromo(data: any): Promise<{ data: IPromo }> {
    return $api.post('/promo', data);
  }
  //редактируем
  static async editPromoById(data: IPromo): Promise<{ data: IPromo }> {
    return $api.put(`/promo/update/${data.id}`, data);
  }
  //удаляем
  static async deletePromoById(id: number): Promise<{ data: any }> {
    return $api.delete(`/promo/delete/${id}`);
  }
}
