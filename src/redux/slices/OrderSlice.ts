import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IOrder, IRestaurauntsState } from '../../dto/orders.dto';
import OrderService from '../services/orders.service';
import { toast } from 'react-toastify';

//==============orders==========================
// const getAllOrders = createAsyncThunk(
//   //action type string
//   'orders/getAllOrders',
//   // callback function
//   async thunkAPI => {
//     try {
//       const response = await OrderService.getAllOrders();
//       return response.data;
//     } catch (error: any) {
//       toast.error(`${error?.status}`);
//       if (error?.data?.message) {
//         console.log({ error });
//         toast.error(`${error?.data?.message}`);
//       } else {
//         toast.error(`${error?.statusText}`);
//       }
//     }
//   }
// );
// const getOrderById = createAsyncThunk(
//   //action type string
//   'Orders/getOrderById',
//   // callback function
//   async (id: number, thunkAPI) => {
//     try {
//       const response = await OrderService.getOrderById(id);
//       return response.data;
//     } catch (error: any) {
//       if (error?.data?.message) {
//         toast.error(`${error?.data?.message}`);
//       } else {
//         toast.error(`${error?.statusText}`);
//       }
//     }
//   }
// );

// const createOrder = createAsyncThunk(
//   //action type string
//   'orders/createlOrder',
//   // callback function
//   async (data: IOrder, thunkAPI) => {
//     try {
//       const response = await OrderService.createOrder(data);
//       toast.success(`Ресторан создан`);
//       return response.data;
//     } catch (error: any) {
//       if (error?.data?.message) {
//         toast.error(`${error?.data?.message}`);
//       } else {
//         toast.error(`${error?.statusText}`);
//       }
//     }
//   }
// );

// const editOrderById = createAsyncThunk(
//   //action type string
//   'Orders/editOrderById',
//   // callback function
//   async (data: IOrder, thunkAPI) => {
//     try {
//       const response = await OrderService.editOrderById(data);
//       toast.success(`Ресторан успешно отредактирован`);
//       return response.data;
//     } catch (error: any) {
//       if (error?.data?.message) {
//         toast.error(`${error?.data?.message}`);
//       } else {
//         toast.error(`${error?.statusText}`);
//       }
//     }
//   }
// );
// const deleteOrderById = createAsyncThunk(
//   //action type string
//   'Orders/deleteOrderById',
//   // callback function
//   async (id: number, thunkAPI) => {
//     try {
//       const response = await OrderService.deleteOrderById(id);
//       toast.success(`${response.data.message}`);
//       return response.data.id;
//     } catch (error: any) {
//       if (error?.data?.message) {
//         toast.error(`${error?.data?.message}`);
//       } else {
//         toast.error(`${error?.statusText}`);
//       }
//     }
//   }
// );

const initialState: any = {
  orders: [
    
  ],
};

const ordersSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {},
  extraReducers: builder => {
  //   //==============Restauraunts==========================
  //   builder.addCase(getAllOrders.fulfilled, (state, action) => {
  //     if (action.payload) state.orders = action.payload;
  //   });
  //   builder.addCase(createOrder.fulfilled, (state, action) => {
  //     if (action.payload) state.orders.push(action.payload);
  //   });
    builder.addCase(editOrderById.fulfilled, (state, action) => {
          if (action.payload) {
            state.orders = state.orders.map(el => {
              if (action?.payload && el.id === action?.payload?.id) {
                return action?.payload;
              } else {
                return el;
              }
            });
          }
    });
  //   builder.addCase(deleteOrderById.fulfilled, (state, action) => {
  //     if (action.payload)
  //       state.orders = state.orders.filter(
  //         el => el.id !== action.payload
  //       );
  //   });
  },
});

// export const ordersActions: any = {
//   ...ordersSlice.actions,
//   getAllOrders,
//   createOrder,
//   editOrderById,
//   deleteOrderById,
// };

export const ordersReducer = ordersSlice.reducer;
