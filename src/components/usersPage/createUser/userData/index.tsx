import { ChangeEvent, FC, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { IUserOrAdmin } from '../../../../dto/users.dto';
import { Column, Label } from '../Styles.elements';
import * as Yup from 'yup';
import { errorData } from '..';

export interface ICreateUserProps {
  state: IUserOrAdmin;
  setState: Function;
  errorData: errorData;
  setErrorData: Function;
}

const UserData: FC<ICreateUserProps> = ({
  state,
  setState,
  errorData,
  setErrorData,
}) => {
  const handleChangeSelect = (event: SelectChangeEvent): void => {
    if (event.target.value === 'ADMIN') {
      setState((prev: ICreateUserProps) => ({ ...prev, role: 'ADMIN' }));
    }
    if (event.target.value === 'USER') {
      setState((prev: ICreateUserProps) => ({ ...prev, role: 'USER' }));
    }
    if (event.target.value === 'active') {
      setState((prev: ICreateUserProps) => ({ ...prev, isActive: true }));
    }
    if (event.target.value === 'deActive') {
      setState((prev: ICreateUserProps) => ({ ...prev, isActive: false }));
    }
  };

  const phoneRegExp =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;

  const mailRegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(phoneRegExp, 'Неверный формат')
      .min(11, 'Неверное количество символов')
      .required('Обязательное поле'),
  });

  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .matches(mailRegExp, 'Неверный формат')
      .required('Обязательное поле'),
  });

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Не менее 8 символов')
      .max(18, 'Не более 16 символов')
      .required('Обязательное поле'),
  });

  const onChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setState((prev: IUserOrAdmin) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

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
    if (e.target.name === 'email') {
      const data: { email: string } = { email: e.target.value };
      const user: boolean = await emailSchema.isValid(data);

      try {
        await emailSchema.validate(data);
        setErrorData({ ...errorData, emailMessage: '', email: !user });
      } catch (err: any) {
        setErrorData({
          ...errorData,
          emailMessage: err?.errors[0],
          email: !user,
        });
      }
    }
    if (e.target.name === 'password') {
      const data: { password: string } = { password: e.target.value };
      const password: boolean = await passwordSchema.isValid(data);

      if (e.target.value === '') {
        return setErrorData({
          ...errorData,
          passwordMessage: '',
          password: false,
        });
      }

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

  return (
    <Column>
      <Label>Данные пользователя</Label>

      <FormControl disabled={!!state.id && true}>
        <InputLabel id='demo-simple-select-helper-label'>
          Тип учётной записи
        </InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={state?.role ?? ''}
          label='Тип учётной записи'
          onChange={handleChangeSelect}
          size='small'
        >
          <MenuItem value={'ADMIN'}>Admin</MenuItem>
          <MenuItem value={'USER'}>User</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id='firstName'
        name='firstName'
        label='Имя'
        variant='outlined'
        size='small'
        value={state?.firstName ?? ''}
        onChange={onChangeHandler}
      />
      <TextField
        id='lastName'
        name='lastName'
        label='Фамилия'
        variant='outlined'
        size='small'
        value={state?.lastName ?? ''}
        onChange={onChangeHandler}
      />
      <TextField
        required
        id='phone'
        name='phone'
        label={errorData.phone ? errorData.phoneMessage : 'Телефон'}
        variant='outlined'
        size='small'
        value={state?.phone ?? ''}
        error={errorData.phone}
        onChange={onChangeHandler}
      />
      <TextField
        required
        id='email'
        name='email'
        label={errorData.email ? errorData.emailMessage : 'Email'}
        error={errorData.email}
        variant='outlined'
        size='small'
        value={state?.email ?? ''}
        onChange={onChangeHandler}
      />
      <TextField
        required
        id='password'
        name='password'
        label={errorData.password ? errorData.passwordMessage : 'Пароль'}
        variant='outlined'
        type='password'
        size='small'
        error={errorData.password}
        value={state?.password ?? ''}
        onChange={onChangeHandler}
      />
      <FormControl>
        <InputLabel id='demo-simple-select-helper-label'>
          Состояние учётной записи
        </InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={state?.isActive ? 'active' : 'deActive'}
          label='Состояние учётной записи'
          onChange={handleChangeSelect}
          size='small'
        >
          <MenuItem value={'active'}>Активен</MenuItem>
          <MenuItem value={'deActive'}>Отключен</MenuItem>
        </Select>
      </FormControl>
    </Column>
  );
};

export default UserData;
