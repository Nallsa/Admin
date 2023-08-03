import { FC, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Button } from '@mui/material';
import { userState } from '../createUser';
import { Wrapper } from './Styles.elements';
import { IUserOrAdmin } from '../../../dto/users.dto';
import { useActions, useAppSelector } from '../../../hooks/useActions';
import { toast } from 'react-toastify';

interface IProps {
  setEditState: Function;
}

const UsersTable: FC<IProps> = ({ setEditState }) => {
  const { getAllUsers, getAllAdmins } = useActions();
  const { users, admins } = useAppSelector(state => state.usersReducer);
  const { admin } = useAppSelector(state => state.authReducer.userData);

  const usersAndAdmins = [...users, ...admins].filter(i => i.role !== 'ROOT');

  useEffect(() => {
    Promise.all([getAllUsers(), getAllAdmins()]);
  }, []);

  function handleClick(user: IUserOrAdmin) {
    if (
      admin.role === 'ROOT' ||
      admin.id === user.id ||
      admin.id === user.parentId ||
      user.role === 'USER'
    ) {
      return setEditState(user);
    }

    return toast.error('Вы не имеете доступ');
  }

  return (
    <Wrapper>
      <Button onClick={() => setEditState(userState)} variant='text'>
        Создать пользователя
      </Button>

      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Имя</TableCell>
              <TableCell align='center' width={'0px'}>
                Фамилия
              </TableCell>
              <TableCell align='center'>Телефон</TableCell>
              <TableCell align='center'>email</TableCell>
              <TableCell align='center'>Тип</TableCell>
              <TableCell align='center'>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersAndAdmins?.map(user => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleClick(user)}
                hover
              >
                <TableCell align='center' component='th' scope='row'>
                  {user?.firstName}
                </TableCell>
                <TableCell align='center' component='th' scope='row'>
                  {user?.lastName}
                </TableCell>
                <TableCell align='center'>{user.phone}</TableCell>
                <TableCell align='center'>{user.email}</TableCell>
                <TableCell align='center'>{user.role}</TableCell>
                <TableCell align='center'>
                  {user.isActive ? 'Активен' : 'Отключен'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default UsersTable;
