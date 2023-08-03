import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IDeliveryType,
  IElementsState,
  IMeasureUnit,
  IPayment,
  IPaymentStatus,
  IStatus,
} from '../../dto/elements.dto';
import ElementService from '../services/elements.service';
import { toast } from 'react-toastify';

//==============measureUnits==========================
const getAllMeasureUnits = createAsyncThunk(
  //action type string
  'measureUnits/getAllMeasureUnits',
  // callback function
  async thunkAPI => {
    try {
      const response = await ElementService.getAllMeasureUnits();
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

const createMeasureUnit = createAsyncThunk(
  //action type string
  'measureUnits/createlMeasureUnit',
  // callback function
  async (data: IMeasureUnit, thunkAPI) => {
    try {
      const response = await ElementService.createMeasureUnit(data);
      toast.success(`Единица измерения успешно создана`);
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

const editMeasureUnitById = createAsyncThunk(
  //action type string
  'MeasureUnits/editMeasureUnitById',
  // callback function
  async (data: IMeasureUnit, thunkAPI) => {
    try {
      const response = await ElementService.editMeasureUnitById(data);
      toast.success(`Единица измерения успешно отредактирован`);
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
const deleteMeasureUnitById = createAsyncThunk(
  //action type string
  'MeasureUnits/deleteMeasureUnitById',
  // callback function
  async (id: string, thunkAPI) => {
    try {
      const response = await ElementService.deleteMeasureUnitById(id);
      toast.success(`Единица измерения успешно удалена`);

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
//==============Statuses==========================
const getAllStatuses = createAsyncThunk(
  //action type string
  'Statuses/getAllStatuses',
  // callback function
  async thunkAPI => {
    try {
      const response = await ElementService.getAllStatuses();
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

const createStatuses = createAsyncThunk(
  //action type string
  'Statuses/createStatuses',
  // callback function
  async (data: IStatus, thunkAPI) => {
    try {
      const response = await ElementService.createStatuses(data);
      toast.success(`Статус заказа успешно создан`);
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

const editStatusesById = createAsyncThunk(
  //action type string
  'Statuses/editStatusesById',
  // callback function
  async (data: IStatus, thunkAPI) => {
    try {
      const response = await ElementService.editStatusesById(data);
      toast.success(`Статус заказа успешно отредактирован`);
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
const deleteStatusesById = createAsyncThunk(
  //action type string
  'Statuses/deleteStatusesById',
  // callback function
  async (id: string, thunkAPI) => {
    try {
      const response = await ElementService.deleteStatusesById(id);
      toast.success(`Статус заказа успешно удален`);

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
//==============PaymentStatus==========================
const getAllPaymentStatus = createAsyncThunk(
  //action type string
  'PaymentStatus/getAllPaymentStatus',
  // callback function
  async thunkAPI => {
    try {
      const response = await ElementService.getAllPaymentStatus();
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

const createPaymentStatus = createAsyncThunk(
  //action type string
  'PaymentStatus/createPaymentStatus',
  // callback function
  async (data: IPaymentStatus, thunkAPI) => {
    try {
      const response = await ElementService.createPaymentStatus(data);
      toast.success(`Статус оплаты успешно создан`);
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

const editPaymentStatusById = createAsyncThunk(
  //action type string
  'PaymentStatus/editPaymentStatusById',
  // callback function
  async (data: IPaymentStatus, thunkAPI) => {
    try {
      const response = await ElementService.editPaymentStatusById(data);
      toast.success(`Статус оплаты успешно отредактирован`);

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
const deletePaymentStatusById = createAsyncThunk(
  //action type string
  'PaymentStatus/deletePaymentStatusById',
  // callback function
  async (id: string, thunkAPI) => {
    try {
      const response = await ElementService.deletePaymentStatusById(id);
      toast.success(`Статус оплаты успешно удален`);
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
//==============Payment==========================
const getAllPayment = createAsyncThunk(
  //action type string
  'Payment/getAllPayment',
  // callback function
  async thunkAPI => {
    try {
      const response = await ElementService.getAllPayment();
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

const createPayment = createAsyncThunk(
  //action type string
  'Payment/createPayment',
  // callback function
  async (data: IPayment, thunkAPI) => {
    try {
      const response = await ElementService.createPayment(data);
      toast.success(`Способ оплаты успешно создан`);
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

const editPaymentById = createAsyncThunk(
  //action type string
  'Payment/editPaymentById',
  // callback function
  async (data: IPayment, thunkAPI) => {
    try {
      const response = await ElementService.editPaymentById(data);
      toast.success(`Способ оплаты успешно отредактирован`);
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
const deletePaymentById = createAsyncThunk(
  //action type string
  'Payment/deletePaymentById',
  // callback function
  async (id: string, thunkAPI) => {
    try {
      const response = await ElementService.deletePaymentById(id);
      toast.success(`Способ оплаты успешно удален`);

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
//==============DeliveryType==========================
const getAllDeliveryType = createAsyncThunk(
  //action type string
  'DeliveryType/getAllDeliveryType',
  // callback function
  async thunkAPI => {
    try {
      const response = await ElementService.getAllDeliveryType();
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

const createDeliveryType = createAsyncThunk(
  //action type string
  'DeliveryType/createDeliveryType',
  // callback function
  async (data: IDeliveryType, thunkAPI) => {
    try {
      const response = await ElementService.createDeliveryType(data);
      toast.success(`Тип доставки успешно создана`);
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

const editDeliveryTypeById = createAsyncThunk(
  //action type string
  'DeliveryType/editDeliveryTypeById',
  // callback function
  async (data: IDeliveryType, thunkAPI) => {
    try {
      const response = await ElementService.editDeliveryTypeById(data);
      toast.success(`Тип доставки успешно отредактирован`);

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
const deleteDeliveryTypeById = createAsyncThunk(
  //action type string
  'DeliveryType/deleteDeliveryTypeById',
  // callback function
  async (id: string, thunkAPI) => {
    try {
      const response = await ElementService.deleteDeliveryTypeById(id);
      toast.success(`Тип доставки успешно удален`);

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

const initialState: IElementsState = {
  measureUnits: [],
  statuses: [],
  paymentStatus: [],
  payments: [],
  deliveryType: [],
};

const elementsSlice = createSlice({
  name: 'Element',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //==============measureUnits==========================
    builder.addCase(getAllMeasureUnits.fulfilled, (state, action) => {
      if (action.payload) state.measureUnits = action.payload;
    });
    builder.addCase(createMeasureUnit.fulfilled, (state, action) => {
      if (action.payload) state.measureUnits.push(action.payload);
    });
    builder.addCase(editMeasureUnitById.fulfilled, (state, action) => {
      if (action.payload)
        state.measureUnits = state.measureUnits.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IMeasureUnit[];
    });
    builder.addCase(deleteMeasureUnitById.fulfilled, (state, action) => {
      if (action.payload)
        state.measureUnits = state.measureUnits.filter(
          el => el.id !== action.payload
        );
    });
    //==============Statuses==========================
    builder.addCase(getAllStatuses.fulfilled, (state, action) => {
      if (action.payload) state.statuses = action.payload;
    });
    builder.addCase(createStatuses.fulfilled, (state, action) => {
      if (action.payload) state.statuses.push(action.payload);
    });
    builder.addCase(editStatusesById.fulfilled, (state, action) => {
      if (action.payload)
        state.statuses = state.statuses.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IStatus[];
    });
    builder.addCase(deleteStatusesById.fulfilled, (state, action) => {
      if (action.payload)
        state.statuses = state.statuses.filter(el => el.id !== action.payload);
    });
    //==============PaymentStatus==========================
    builder.addCase(getAllPaymentStatus.fulfilled, (state, action) => {
      if (action.payload) state.paymentStatus = action.payload;
    });
    builder.addCase(createPaymentStatus.fulfilled, (state, action) => {
      if (action.payload) state.paymentStatus.push(action.payload);
    });
    builder.addCase(editPaymentStatusById.fulfilled, (state, action) => {
      if (action.payload)
        state.paymentStatus = state.paymentStatus.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IPaymentStatus[];
    });
    builder.addCase(deletePaymentStatusById.fulfilled, (state, action) => {
      if (action.payload)
        state.paymentStatus = state.paymentStatus.filter(
          el => el.id !== action.payload
        );
    });
    //==============Payment==========================
    builder.addCase(getAllPayment.fulfilled, (state, action) => {
      if (action.payload) state.payments = action.payload;
    });
    builder.addCase(createPayment.fulfilled, (state, action) => {
      if (action.payload) state.payments.push(action.payload);
    });
    builder.addCase(editPaymentById.fulfilled, (state, action) => {
      if (action.payload)
        state.payments = state.payments.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IPayment[];
    });
    builder.addCase(deletePaymentById.fulfilled, (state, action) => {
      if (action.payload)
        state.payments = state.payments.filter(el => el.id !== action.payload);
    });
    //==============DeliveryType==========================
    builder.addCase(getAllDeliveryType.fulfilled, (state, action) => {
      if (action.payload) state.deliveryType = action.payload;
    });
    builder.addCase(createDeliveryType.fulfilled, (state, action) => {
      if (action.payload) state.deliveryType.push(action.payload);
    });
    builder.addCase(editDeliveryTypeById.fulfilled, (state, action) => {
      if (action.payload)
        state.deliveryType = state.deliveryType.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IDeliveryType[];
    });
    builder.addCase(deleteDeliveryTypeById.fulfilled, (state, action) => {
      if (action.payload)
        state.deliveryType = state.deliveryType.filter(
          el => el.id !== action.payload
        );
    });
  },
});

export const elementsActions: any = {
  ...elementsSlice.actions,
  getAllMeasureUnits,
  createMeasureUnit,
  editMeasureUnitById,
  deleteMeasureUnitById,
  getAllStatuses,
  createStatuses,
  editStatusesById,
  deleteStatusesById,
  getAllPaymentStatus,
  createPaymentStatus,
  editPaymentStatusById,
  deletePaymentStatusById,
  getAllPayment,
  createPayment,
  editPaymentById,
  deletePaymentById,
  getAllDeliveryType,
  createDeliveryType,
  editDeliveryTypeById,
  deleteDeliveryTypeById,
};

export const elementsReducer = elementsSlice.reducer;
