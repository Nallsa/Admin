import { IProduct } from './products.dto';

export interface IPromoState {
  promo: IPromo[];
}

export interface IPromo {
  id?: string | null;
  parentId?: string | null;
  title: string;
  alias: string | null;
  isActive: boolean;
  isInfinity: boolean | null;
  activeDate: Date | null;
  description: string | null;
  smallImage: string | null;
  image: string | null;
  productsPromo: IProduct[];
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  metaRobots: string | null;
}
