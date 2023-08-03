import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPromo, IPromoState } from '../../dto/promo.dto';
import PromoService from '../services/promo.service';
import { toast } from 'react-toastify';

//==============Promo==========================
const getAllPromo = createAsyncThunk(
  //action type string
  'promo/getAllPromo',
  // callback function
  async thunkAPI => {
    try {
      const response = await PromoService.getAllPromo();
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

const createPromo = createAsyncThunk(
  //action type string
  'promo/createPromo',
  // callback function
  async (data: IPromo, thunkAPI) => {
    try {
      const response = await PromoService.createPromo(data);
      toast.success(`Пользователь создан`);
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

const editPromoById = createAsyncThunk(
  //action type string
  'Promo/editPromoById',
  // callback function
  async (data: IPromo, thunkAPI) => {
    try {
      const response = await PromoService.editPromoById(data);

      toast.success(`Пользователь успешно отредактирован`);
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
const deletePromoById = createAsyncThunk(
  //action type string
  'Promo/deletePromoById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await PromoService.deletePromoById(id);
      toast.success(`Пользователь успешно удален`);
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

const initialState: IPromoState = {
  promo: [],
};

const promoSlice = createSlice({
  name: 'PromoOrAdmin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //==============Promo==========================
    builder.addCase(getAllPromo.fulfilled, (state, action) => {
      if (action.payload) state.promo = action.payload;
    });
    builder.addCase(createPromo.fulfilled, (state, action) => {
      if (action.payload) state.promo.push(action.payload);
    });
    builder.addCase(editPromoById.fulfilled, (state, action) => {
      if (action.payload)
        state.promo = state.promo.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IPromo[];
    });
    builder.addCase(deletePromoById.fulfilled, (state, action) => {
      if (action.payload)
        state.promo = state.promo.filter(el => el.id !== action.payload);
    });
  },
});

export const promoActions: any = {
  ...promoSlice.actions,
  getAllPromo,
  createPromo,
  editPromoById,
  deletePromoById,
};

export const promoReducer = promoSlice.reducer;
