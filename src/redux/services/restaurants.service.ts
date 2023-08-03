/* import $api from '../api'; */
import { $api } from '../api';

import { IRestaurant } from '../../dto/restaurants.dto';

export default class RestaurantService {
  //==============Restaurants==========================
  //получаем все
  static async getAllRestaurants(): Promise<{ data: IRestaurant[] }> {
    return $api.get('/restaurants');
  }
  //получаем по id
  static async getRestaurantById(id: number): Promise<{ data: IRestaurant }> {
    return $api.get(`/restaurants/${id}`);
  }
  //создаём
  static async createRestaurant(data: any): Promise<{ data: IRestaurant }> {
    return $api.post('/restaurants', data);
  }
  //редактируем
  static async editRestaurantById(
    data: IRestaurant
  ): Promise<{ data: IRestaurant }> {
    return $api.put(`/restaurants/update/${data.id}`, data);
  }
  //удаляем
  static async deleteRestaurantById(id: number): Promise<{ data: any }> {
    return $api.delete(`/restaurants/delete/${id}`);
  }
}
