import { uiActions } from './slices/UI';
import { restaurantsActions } from './slices/RestaurantSlice';
import { usersActions } from './slices/UsersSlice';
import { productsActions } from './slices/ProductsSlice';
import { elementsActions } from './slices/ElementsSlice';
import { authActions } from './slices/AuthSlice';
import { promoActions } from './slices/PromoSlice';

const Actions = {
  ...uiActions,
  ...promoActions,
  ...authActions,
  ...usersActions,
  ...productsActions,
  ...restaurantsActions,
  ...elementsActions,
};

export default Actions;
