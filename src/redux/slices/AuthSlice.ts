import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { BASE_URL } from '../../config';
import AuthService from '../services/auth.service';
import { toast } from 'react-toastify';
import { IAuthState, authParams } from '../../dto/auth.dto';
import { IUserOrAdmin } from '../../dto/users.dto';
import { useNavigate } from 'react-router-dom';

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  // async (params: registerParams) => {
  //   const { data } = await axios.post(`${BASE_URL}register/admin/`, params);
  //   return data;
  // }

  async (data: IUserOrAdmin) => {
    const navigate = useNavigate();
    try {
      const response = await AuthService.fetchRegister(data);
      toast.success(`Регистрация успешно прошла`);

      // return response.data;
      return navigate('/');
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',

  async (data: authParams) => {
    try {
      const response = await AuthService.fetchAuth(data);
      toast.success(`Авторизация успешно прошла`);
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

const initialState: IAuthState = {
  userData: {
    admin: null,
    token: '',
  },
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      state.userData = { admin: null, token: null };
    },
    setAdmin: (state, action) => {
      state.userData.admin = action.payload;
    },
    setToken: (state, action) => {
      state.userData.token = action.payload;
    },
  },
  extraReducers: builder => {
    // FETCH AUTH
    builder.addCase(fetchAuth.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchAuth.fulfilled, (state: any, action) => {
      if (action.payload?.admin) {
        state.userData.admin = action.payload.admin;
        state.userData.token = action.payload.admin.token;
        localStorage.setItem('token', action.payload.admin.token);
        state.status = 'succesed';
      }
    });
    builder.addCase(fetchAuth.rejected, state => {
      console.log('smthng goes wrong in fetchAuth');
      alert('Неверный логин или пароль');
      state.userData = { admin: null, token: null };
      state.status = 'failed';
    });
    // FETCH REGISTER
    // builder.addCase(fetchRegister.pending, state => {
    //   state.status = 'loading';
    // });
    // builder.addCase(fetchRegister.fulfilled, (state, action) => {
    //   if (action.payload?.admin) {
    //     state.userData.admin = action.payload.admin;
    //     state.userData.token = action.payload.admin.token;
    //     localStorage.setItem('token', action.payload.admin.token);
    //     state.status = 'succesed';
    //   }
    // });
    // builder.addCase(fetchRegister.rejected, state => {
    //   console.log('smthng goes wrong in fetchRegister');
    //   state.userData.admin = null;
    // });
  },
});

export const authActions: any = {
  ...authSlice.actions,
  fetchAuth,
  fetchRegister,
};

export const authReducer = authSlice.reducer;
export const selectIsAuth = (state: RootState) =>
  Boolean(state?.authReducer?.userData?.token);
export const selectSuperUser = (state: RootState) =>
  state?.authReducer?.userData?.admin?.role === 'SuperUser';
