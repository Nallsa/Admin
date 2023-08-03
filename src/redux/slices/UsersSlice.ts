import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserOrAdmin, IUsersAndAdminsState } from '../../dto/users.dto';
import UserService from '../services/users.service';
import { toast } from 'react-toastify';

//==============Users==========================
const getAllUsers = createAsyncThunk(
  //action type string
  'users/getAllUsers',
  // callback function
  async thunkAPI => {
    try {
      const response = await UserService.getAllUsers();
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

const createUserAdmin = createAsyncThunk(
  //action type string
  'users/createlUser',
  // callback function
  async (data: IUserOrAdmin, thunkAPI) => {
    try {
      const response = await UserService.createUserAdmin(data);
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

const editUserById = createAsyncThunk(
  //action type string
  'Users/editUserById',
  // callback function
  async (data: IUserOrAdmin, thunkAPI) => {
    try {
      const response = await UserService.editUserById(data);

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
const deleteUserById = createAsyncThunk(
  //action type string
  'Users/deleteUserById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await UserService.deleteUserById(id);
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

//==============Admins==========================
const getAllAdmins = createAsyncThunk(
  //action type string
  'Admins/getAllAdmins',
  // callback function
  async thunkAPI => {
    try {
      const response = await UserService.getAllAdmins();
      return response.data;
    } catch (error: any) {
      toast.error(`${error?.status}`);
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const createAdmin = createAsyncThunk(
  //action type string
  'Admins/createlAdmin',
  // callback function
  async (data: IUserOrAdmin, thunkAPI) => {
    try {
      const response = await UserService.createAdmin(data);

      toast.success(`Админ создан`);
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

const editAdminById = createAsyncThunk(
  //action type string
  'Admins/editAdminById',
  // callback function
  async (data: IUserOrAdmin, thunkAPI) => {
    try {
      const response = await UserService.editAdminById(data);
      toast.success(`Админ отредактирован`);

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
const deleteAdminById = createAsyncThunk(
  //action type string
  'Admins/deleteAdminById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await UserService.deleteAdminById(id);
      toast.success(`Админ удален`);
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

const initialState: IUsersAndAdminsState = {
  users: [],
  admins: [],
};

const usersSlice = createSlice({
  name: 'UserOrAdmin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //==============Users==========================
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      if (action.payload) state.users = action.payload;
    });
    builder.addCase(createUserAdmin.fulfilled, (state, action) => {
      if (action.payload) state.users.push(action.payload);
    });
    builder.addCase(editUserById.fulfilled, (state, action) => {
      if (action.payload)
        state.users = state.users.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IUserOrAdmin[];
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      if (action.payload)
        state.users = state.users.filter(el => el.id !== action.payload);
    });

    //==============Admins==========================
    builder.addCase(getAllAdmins.fulfilled, (state, action) => {
      if (action.payload) state.admins = action.payload;
    });
    builder.addCase(createAdmin.fulfilled, (state, action) => {
      if (action.payload) state.admins.push(action.payload);
    });
    builder.addCase(editAdminById.fulfilled, (state, action) => {
      if (action.payload)
        state.admins = state.admins.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IUserOrAdmin[];
    });
    builder.addCase(deleteAdminById.fulfilled, (state, action) => {
      if (action.payload)
        state.admins = state.admins.filter(el => el.id !== action.payload);
    });
  },
});

export const usersActions: any = {
  ...usersSlice.actions,
  getAllUsers,
  createUserAdmin,
  editUserById,
  deleteUserById,
  getAllAdmins,
  createAdmin,
  editAdminById,
  deleteAdminById,
};

export const usersReducer = usersSlice.reducer;
