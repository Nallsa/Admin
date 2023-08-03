import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './slices/AuthSlice';
import { restaurantsReducer } from './slices/RestaurantSlice';
import { productsReducer } from './slices/ProductsSlice';
import { elementsReducer } from './slices/ElementsSlice';
import { usersReducer } from './slices/UsersSlice';
import { promoReducer } from './slices/PromoSlice';

import { setupListeners } from '@reduxjs/toolkit/dist/query';
import uiReducer from './slices/UI';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  authReducer,
  restaurantsReducer,
  productsReducer,
  elementsReducer,
  promoReducer,
  usersReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
