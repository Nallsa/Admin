import { FC } from 'react';
import TextField from '@mui/material/TextField';
import { IRestaurantAdress } from '../../../../dto/restaurants.dto';

interface IProps {
  state?: IRestaurantAdress;
  setState: (name: string, value: number | string) => void;
}

const AddressChoice: FC<IProps> = ({ state, setState }) => {
  const handleChangeAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setState(e.currentTarget.name, e.currentTarget.value);
  };

  return (
    <>
      <TextField
        sx={{ marginTop: '5px', marginBottom: '5px' }}
        fullWidth
        onChange={handleChangeAddress}
        name='city'
        value={state?.city}
        size='small'
        id='city'
        label='Город'
        variant='outlined'
      />{' '}
      <TextField
        sx={{ marginTop: '5px', marginBottom: '5px' }}
        fullWidth
        onChange={handleChangeAddress}
        name='street'
        value={state?.street}
        size='small'
        id='street'
        label='Улица'
        variant='outlined'
      />
      <TextField
        sx={{ marginTop: '5px', marginBottom: '5px' }}
        fullWidth
        onChange={handleChangeAddress}
        name='house'
        value={state?.house}
        size='small'
        id='house'
        label='Номер дома'
        variant='outlined'
      />
      <TextField
        sx={{ marginTop: '5px', marginBottom: '5px' }}
        fullWidth
        onChange={handleChangeAddress}
        name='housing'
        value={state?.housing}
        size='small'
        id='housing'
        label='Корпус'
        variant='outlined'
      />
      <TextField
        sx={{ marginTop: '5px', marginBottom: '5px' }}
        fullWidth
        onChange={handleChangeAddress}
        name='floor'
        value={state?.floor}
        size='small'
        id='floor'
        label='Этаж'
        variant='outlined'
      />
      <TextField
        sx={{ marginTop: '5px', marginBottom: '5px' }}
        fullWidth
        onChange={handleChangeAddress}
        name='description'
        value={state?.description}
        size='small'
        id='house'
        label='Комментарий'
        variant='outlined'
      />
    </>
  );
};

export default AddressChoice;
