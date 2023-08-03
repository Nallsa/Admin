export interface IProductsState {
  products: IProduct[];
  categoryProducts: ICategoryProducts[];
}

export interface IProduct {
  id?: string | null;
  title: string;
  description: string | null;
  article: string | null;
  price: number | null;
  restaurantPrice?: IRestaurantPrice[] | null;
  measurementUnitId: string | null;
  size: string | null;
  weight: string | null;
  kkal: string | null;
  proteins: string | null;
  fats: string | null;
  carbohydrates: string | null;
  smallImage: string | null;
  color: string | null;
  isHidden: boolean;
  isActive: boolean;
  isSale: boolean;
  isDelivery: boolean;
  categoryProductsId: string | null;
  promoId?: string | null;
  image: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  metaRobots: string | null;
}

export interface IRestaurantPrice {
  id?: string | null;
  restaurantId: string | null;
  price: string | null;
  productsId: string | null;
}

export interface ICategoryProducts {
  id?: string | null;
  parentId?: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  color: string | null;
  restourantId?: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  metaRobots: string | null;
}
