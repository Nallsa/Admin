/* import $api from '../api'; */
import { $api } from '../api';

import {
  IDeliveryType,
  IMeasureUnit,
  IPayment,
  IPaymentStatus,
  IStatus,
} from '../../dto/elements.dto';

export default class ElementService {
  //==============MeasureUnits==========================
  //получаем все
  static async getAllMeasureUnits(): Promise<{ data: IMeasureUnit[] }> {
    return $api.get('/measure-units');
  }
  //создаём
  static async createMeasureUnit(data: any): Promise<{ data: IMeasureUnit }> {
    return $api.post('/measure-units', data);
  }
  //редактируем
  static async editMeasureUnitById(
    data: IMeasureUnit
  ): Promise<{ data: IMeasureUnit }> {
    return $api.put(`/measure-units/update/${data.id}`, data);
  }
  //удаляем
  static async deleteMeasureUnitById(id: string): Promise<{ data: any }> {
    return $api.delete(`/measure-units/delete/${id}`);
  }
  //==============Statuses==========================
  //получаем все
  static async getAllStatuses(): Promise<{ data: IStatus[] }> {
    return $api.get('/statuses');
  }
  //создаём
  static async createStatuses(data: any): Promise<{ data: IStatus }> {
    return $api.post('/statuses', data);
  }
  //редактируем
  static async editStatusesById(data: IStatus): Promise<{ data: IStatus }> {
    return $api.put(`/statuses/update/${data.id}`, data);
  }
  //удаляем
  static async deleteStatusesById(id: string): Promise<{ data: any }> {
    return $api.delete(`/statuses/delete/${id}`);
  }
  //==============PaymentStatus==========================
  //получаем все
  static async getAllPaymentStatus(): Promise<{ data: IPaymentStatus[] }> {
    return $api.get('/payment-statuses');
  }
  //создаём
  static async createPaymentStatus(
    data: any
  ): Promise<{ data: IPaymentStatus }> {
    return $api.post('/payment-statuses', data);
  }
  //редактируем
  static async editPaymentStatusById(
    data: IPaymentStatus
  ): Promise<{ data: IPaymentStatus }> {
    return $api.put(`/payment-statuses/update/${data.id}`, data);
  }
  //удаляем
  static async deletePaymentStatusById(id: string): Promise<{ data: any }> {
    return $api.delete(`/payment-statuses/delete/${id}`);
  }
  //==============Payment==========================
  //получаем все
  static async getAllPayment(): Promise<{ data: IPayment[] }> {
    return $api.get('/payment');
  }
  //создаём
  static async createPayment(data: any): Promise<{ data: IPayment }> {
    return $api.post('/payment', data);
  }
  //редактируем
  static async editPaymentById(data: IPayment): Promise<{ data: IPayment }> {
    return $api.put(`/payment/update/${data.id}`, data);
  }
  //удаляем
  static async deletePaymentById(id: string): Promise<{ data: any }> {
    return $api.delete(`/payment/delete/${id}`);
  }
  //==============DeliveryType==========================
  //получаем все
  static async getAllDeliveryType(): Promise<{ data: IDeliveryType[] }> {
    return $api.get('/delivery-type');
  }
  //создаём
  static async createDeliveryType(data: any): Promise<{ data: IDeliveryType }> {
    console.log('das');

    return $api.post('/delivery-type', data);
  }
  //редактируем
  static async editDeliveryTypeById(
    data: IDeliveryType
  ): Promise<{ data: IDeliveryType }> {
    return $api.put(`/delivery-type/update/${data.id}`, data);
  }
  //удаляем
  static async deleteDeliveryTypeById(id: string): Promise<{ data: any }> {
    return $api.delete(`/delivery-type/delete/${id}`);
  }
}
