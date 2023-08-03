export interface IRestaurantsState {
  restaurants: IRestaurant[];
}

export interface IRestaurant {
  id?: string | null;
  restaurantAdress: IRestaurantAdress;
  restaurantAdressId?: string | null;
  name: string | null;
  parentId?: string | null;
  isActive?: boolean | null;
  contactEmail?: string | null;
  businessAddress?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  workTime?: string | null;
  mapLink?: string | null;
  timeOpen?: string | null;
  timeClose?: string | null;
}

export interface IRestaurantAdress {
  id?: string | null;
  parentId?: string | null;
  city: string | null;
  street: string | null;
  house: string | null;
  housing: string | null;
  description?: string | null;
  floor?: string | null;
  isActive?: boolean;
}
