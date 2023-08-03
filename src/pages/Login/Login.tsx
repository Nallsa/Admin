import {
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchAuth } from '../../redux/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import * as Yup from 'yup';
import { FormWrapper } from './styled-components/LoginForm.elements';
import { useActions } from '../../hooks/useActions';

interface errorData {
  phone: boolean;
  password: boolean;
  phoneMessage: string;
  passwordMessage: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState({
    phone: '+7',
    password: '',
  });
  const [errorData, setErrorData] = useState<errorData>({
    phone: false,
    phoneMessage: '',
    password: false,
    passwordMessage: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { fetchAuth } = useActions();
  const token = localStorage.getItem('token');

  const phoneRegExp =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(phoneRegExp, 'Неверный формат')
      .min(11, 'Неверное количество символов')
      .required('Обязательное поле'),
  });
  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .max(16, 'Не более 16 символов')
      .required('Обязательное поле'),
  });

  const handleSetLoginData = async (e: any): Promise<void> => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (e.target.name === 'phone') {
      const data: { phone: string } = { phone: e.target.value };
      const user: boolean = await phoneSchema.isValid(data);
      try {
        await phoneSchema.validate(data);
        setErrorData({ ...errorData, phoneMessage: '', phone: !user });
      } catch (err: any) {
        setErrorData({
          ...errorData,
          phoneMessage: err?.errors[0],
          phone: !user,
        });
      }
    }
    if (e.target.name === 'password') {
      const data: { password: string } = { password: e.target.value };
      const password: boolean = await passwordSchema.isValid(data);
      try {
        await passwordSchema.validate(data);
        setErrorData({
          ...errorData,
          passwordMessage: '',
          password: !password,
        });
      } catch (err: any) {
        setErrorData({
          ...errorData,
          passwordMessage: err?.errors[0],
          password: !password,
        });
      }
    }
  };

  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();

    fetchAuth(loginData);

    token ?? navigate('/');

    const decoded: any = await jwtDecode(token!);
    toast.success(`Здравствуйте, ${decoded.username}!`);
  };

  const keyEnterHandler = (e: any): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLoginSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <FormWrapper>
        <Typography variant='h4' gutterBottom>
          Вход в панель управления
        </Typography>

        <TextField
          placeholder='Номер телефона'
          fullWidth
          value={loginData.phone}
          label={errorData.phone ? errorData.phoneMessage : null}
          name='phone'
          type='phone'
          onChange={handleSetLoginData}
          required
          error={errorData.phone}
        />

        <TextField
          placeholder='Пароль'
          fullWidth
          name='password'
          type={showPassword ? 'text' : 'password'}
          label={errorData.password ? errorData.passwordMessage : null}
          onChange={handleSetLoginData}
          required
          error={errorData.password}
          onKeyPress={keyEnterHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant='contained'
          fullWidth
          size='large'
          disabled={errorData.phone || errorData.password}
          onClick={handleLoginSubmit}
        >
          Вход
        </Button>

        <Typography variant='body2' sx={{ mt: { md: 2 } }}>
          У Вас нет аккаунта? {''}
          <a href='http://bruno.vies.tech/franchise'>
            Подайте заявку на странице франшизы
          </a>
        </Typography>
      </FormWrapper>
    </Box>
  );
};

export default Login;
