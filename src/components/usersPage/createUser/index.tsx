import { FC, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { IUserOrAdmin } from '../../../dto/users.dto';
import { Row, Wrapper } from './Styles.elements';
import UserData from './userData';
import { useActions, useAppSelector } from '../../../hooks/useActions';
import { Navigate, useNavigate } from 'react-router-dom';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { Id, toast } from 'react-toastify';

interface IProps {
  editUser: IUserOrAdmin | null;
  setEditState: Function;
}

export const userState: IUserOrAdmin = {
  id: null,
  firstName: null,
  lastName: null,
  phone: null,
  email: null,
  password: null,
  isActive: true,
  role: null,
};

export interface errorData {
  phone: boolean;
  email: boolean;
  password: boolean;
  phoneMessage: string;
  emailMessage: string;
  passwordMessage: string;
}

const CreateUser: FC<IProps> = ({ editUser, setEditState }) => {
  const [state, setState] = useState<IUserOrAdmin>(userState);
  const [errorData, setErrorData] = useState<errorData>({
    phone: false,
    phoneMessage: '',
    email: false,
    emailMessage: '',
    password: false,
    passwordMessage: '',
  });

  const {
    createUserAdmin,
    editUserById,
    createAdmin,
    editAdminById,
    deleteAdminById,
    deleteUserById,
  } = useActions();

  useEffect(() => {
    if (editUser?.id) {
      setState((prev: IUserOrAdmin) => ({ ...prev, ...editUser }));
    }
  }, [editUser]);

  const saveHandler = (): void => {
    if (state.id) {
      if (state.role == 'ADMIN') {
        (async () => {
          const response = await editAdminById(state);
          if (response.payload) {
            return setEditState(null);
          }
        })();

        return;
      }

      if (state.role == 'USER') {
        (async () => {
          const response = await editUserById(state);
          if (response.payload) {
            return setEditState(null);
          }
        })();

        return;
      }
    }

    if (state.password === null || state.password === '') {
      return setErrorData({
        ...errorData,
        passwordMessage: 'Пароль не задан',
        password: true,
      });
    }

    if (state.role == 'ADMIN') {
      (async () => {
        delete state.id;
        const response = await createAdmin(state);
        if (response.payload) {
          return setEditState(null);
        }
      })();

      return;
    }

    if (state.role == 'USER') {
      (async () => {
        delete state.id;

        const response = await createUserAdmin(state);
        if (response.payload) {
          return setEditState(null);
        }
      })();

      return;
    }
  };

  const handleCancel = (): void => {
    setEditState(null);
  };

  const deleteHandler = (): void => {
    if (state.id) {
      if (state.role == 'ADMIN') {
        (async () => {
          const response = await deleteAdminById(state.id);

          if (response.payload) {
            return setEditState(null);
          }
        })();

        return;
      }

      if (state.role == 'USER') {
        (async () => {
          const response = await deleteUserById(state.id);

          if (response.payload) {
            return setEditState(null);
          }
        })();

        return;
      }
    }
  };

  return (
    <Wrapper mini>
      <Grid container>
        <Grid item>
          <UserData
            errorData={errorData}
            setErrorData={setErrorData}
            state={state}
            setState={setState}
          />
        </Grid>
      </Grid>

      <Row>
        <Button
          disabled={
            !state.phone ||
            errorData.phone ||
            errorData.email ||
            errorData.password
          }
          onClick={saveHandler}
          variant='text'
        >
          Сохранить
        </Button>
        <Button onClick={handleCancel} color='error' variant='text'>
          Назад
        </Button>
        {editUser && editUser.id ? (
          <Button
            style={{ marginLeft: '70px' }}
            onClick={deleteHandler}
            color='warning'
            variant='text'
          >
            Удалить
          </Button>
        ) : (
          <></>
        )}
      </Row>
    </Wrapper>
  );
};

export default CreateUser;
