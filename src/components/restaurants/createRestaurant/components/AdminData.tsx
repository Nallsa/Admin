import { FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { useActions, useAppSelector } from '../../../../hooks/useActions';
import { IRestaurant } from '../../../../dto/restaurants.dto';
import { Autocomplete, Input, TextField } from '@mui/material';
import { IUserOrAdmin } from '../../../../dto/users.dto';

interface IProps {
  state: IRestaurant | null;
  setState: Function;
}

const AdminData: FC<IProps> = ({ state, setState }) => {
  const { getAllAdmins } = useActions();
  const { admins } = useAppSelector(state => state.usersReducer);
  const [selectedAdmin, setSelectedAdmin] = useState<IUserOrAdmin | null>(null);

  const handleChangeMultiple = (event: any, value: any) => {
    setSelectedAdmin(value);
    if (value) {
      setState((prev: IRestaurant) => ({
        ...prev,
        parentId: value.id,
      }));
    }
  };

  useEffect(() => {
    if (!admins || admins.length === 0) {
      getAllAdmins();
    }

    if (state?.parentId) {
      setSelectedAdmin(admins.filter(el => el.id === state.parentId)[0]);
    }
  }, []);

  return (
    <FormControl sx={{ marginTop: '5px', marginBottom: '5px' }}>
      <Autocomplete
        size='small'
        id='category-outlined'
        options={admins}
        disabled={admins.length === 0}
        getOptionLabel={option => String(option.firstName)}
        filterSelectedOptions
        value={selectedAdmin}
        onChange={handleChangeMultiple}
        renderInput={params => {
          return <TextField {...params} />;
        }}
      />
    </FormControl>
  );
};

export default AdminData;
