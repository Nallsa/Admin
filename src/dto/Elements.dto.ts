export interface IElementsState {
  measureUnits: IMeasureUnit[];
  statuses: IStatus[];
  paymentStatus: IPaymentStatus[];
  payments: IPayment[];
  deliveryType: IDeliveryType[];
}

export interface IMeasureUnit {
  id?: string | null;
  title: string | null;
  parentId?: string | null;
  isActive?: boolean | null;
}

export interface IStatus {
  id?: string | null;
  title: string | null;
  parentId?: string | null;
  isActive?: boolean | null;
}

export interface IPaymentStatus {
  id?: string | null;
  title: string | null;
  parentId?: string | null;
  isActive?: boolean | null;
}
export interface IPayment {
  id?: string | null;
  title: string | null;
  parentId?: string | null;
  isActive?: boolean | null;
}
export interface IDeliveryType {
  id?: string | null;
  title: string | null;
  parentId?: string | null;
  isActive?: boolean | null;
}
