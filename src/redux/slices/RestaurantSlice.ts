import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRestaurant, IRestaurantsState } from '../../dto/restaurants.dto';
import RestaurantService from '../services/restaurants.service';
import { toast } from 'react-toastify';

//==============restaurants==========================
const getAllRestaurants = createAsyncThunk(
  //action type string
  'restaurants/getAllRestaurants',
  // callback function
  async thunkAPI => {
    try {
      const response = await RestaurantService.getAllRestaurants();
      return response.data;
    } catch (error: any) {
      toast.error(`${error?.status}`);
      if (error?.data?.message) {
        console.log({ error });
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);
const getRestaurantById = createAsyncThunk(
  //action type string
  'Restaurants/getRestaurantById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await RestaurantService.getRestaurantById(id);
      return response.data;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const createRestaurant = createAsyncThunk(
  //action type string
  'restaurants/createlRestaurant',
  // callback function
  async (data: IRestaurant, thunkAPI) => {
    try {
      const response = await RestaurantService.createRestaurant(data);
      toast.success(`Ресторан создан`);
      return response.data;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`Не удалось создать ресторан`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const editRestaurantById = createAsyncThunk(
  //action type string
  'Restaurants/editRestaurantById',
  // callback function
  async (data: IRestaurant, thunkAPI) => {
    try {
      const response = await RestaurantService.editRestaurantById(data);
      toast.success(`Ресторан успешно отредактирован`);
      return response.data;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);
const deleteRestaurantById = createAsyncThunk(
  //action type string
  'Restaurants/deleteRestaurantById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await RestaurantService.deleteRestaurantById(id);
      toast.success(`Ресторан удален`);
      return response.data.id;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const initialState: IRestaurantsState = {
  restaurants: [],
};

const restaurantsSlice = createSlice({
  name: 'Restaurant',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //==============Restauraunts==========================
    builder.addCase(getAllRestaurants.fulfilled, (state, action) => {
      if (action.payload) state.restaurants = action.payload;
    });
    builder.addCase(createRestaurant.fulfilled, (state, action) => {
      if (action.payload) state.restaurants.push(action.payload);
    });
    builder.addCase(editRestaurantById.fulfilled, (state, action) => {
      if (action.payload)
        state.restaurants = state.restaurants.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IRestaurant[];
    });
    builder.addCase(deleteRestaurantById.fulfilled, (state, action) => {
      if (action.payload)
        state.restaurants = state.restaurants.filter(
          el => el.id !== action.payload
        );
    });
  },
});

export const restaurantsActions: any = {
  ...restaurantsSlice.actions,
  getAllRestaurants,
  createRestaurant,
  editRestaurantById,
  deleteRestaurantById,
};

export const restaurantsReducer = restaurantsSlice.reducer;
