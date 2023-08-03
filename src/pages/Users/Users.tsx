import CreateUser from '../../components/usersPage/createUser';
import UsersTable from '../../components/usersPage/usersTable';
import { IUserOrAdmin } from '../../dto/users.dto';
import { FC, useState } from 'react';

const Users: FC = () => {
  const [editData, setEditData] = useState<IUserOrAdmin | null>(null);

  return (
    <>
      {editData ? (
        <CreateUser editUser={editData} setEditState={setEditData} />
      ) : (
        <>
          <UsersTable setEditState={setEditData} />
        </>
      )}
    </>
  );
};

export default Users;
