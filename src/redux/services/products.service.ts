import { $api } from '../api';
import { ICategoryProducts, IProduct } from '../../dto/products.dto';

export default class ProductsService {
  //==============CategoryProducts==========================
  //получаем все категории
  static async getAllCategoryProducts(): Promise<{ data: ICategoryProducts[] }> {
    return $api.get('/category-products');
  }
  //получаем по категорию id
  static async getCategoryProductsById(
    id: number
  ): Promise<{ data: ICategoryProducts }> {
    return $api.get(`/category-products/${id}`);
  }
  //создаём категорию
  static async createCategoryProducts(
    data: any
  ): Promise<{ data: ICategoryProducts }> {
    return $api.post('/category-products', data);
  }
  //редактируем категорию
  static async editCategoryProductsById(
    data: any
  ): Promise<{ data: ICategoryProducts }> {
    return $api.put(`/category-products/update/${data.id}`, data);
  }
  //удаляем категорию
  static async deleteCategoryProductsById(id: string): Promise<{ data: any }> {
    return $api.delete(`/category-products/delete/${id}`);
  }
  //================Products===================================
  //получаем все товары
  static async getAllProducts(): Promise<{ data: IProduct[] }> {
    return $api.get('/products');
  }
  //получаем по товар id
  static async getProductById(id: number): Promise<{ data: IProduct }> {
    return $api.get(`/products/${id}`);
  }
  //создаём товар
  static async createProduct(data: any): Promise<{ data: IProduct }> {
    return $api.post('/products', data);
  }
  //редактируем товар
  static async editProductById(data: any): Promise<{ data: IProduct }> {
    return $api.put(`/products/update/${data.id}`, data);
  }
  //удаляем товар
  static async deleteProductById(id: number): Promise<{ data: any }> {
    return $api.delete(`/products/delete/${id}`);
  }
}
