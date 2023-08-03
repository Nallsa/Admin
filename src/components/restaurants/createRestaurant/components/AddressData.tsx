import { ChangeEvent, FC } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import CityChoice from './CityChoice';
import StreetChoice from './StreetChoice';
import AddressChoice from './AddressChoice';

import { Wrapper, HeaderTitle, Row } from './Styles.elements';
import { IRestaurant } from '../../../../dto/restaurants.dto';

interface IProps {
  state: IRestaurant | null;
  setState: Function;
  handleSave: () => void;
  handleCancel: () => void;
}

const AddressData: FC<IProps> = ({
  state,
  setState,
  handleSave,
  handleCancel,
}) => {
  const handleChangeAddress = (
    name: string,
    value: number | string | null
  ): void => {
    setState((prev: IRestaurant) => ({
      ...prev,
      restaurantAdress: { ...prev.restaurantAdress, [name]: value },
    }));
  };

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IRestaurant) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <HeaderTitle>Домен точки</HeaderTitle>
      <TextField
        value={state?.name}
        name='name'
        onChange={handleChangeData}
        sx={{ marginTop: '5px', marginBottom: '5px' }}
        size='small'
        id='outlined-basic-name'
        label='Название'
        fullWidth
        variant='outlined'
      />
      <HeaderTitle>Адрес</HeaderTitle>

      <AddressChoice
        state={state?.restaurantAdress}
        setState={handleChangeAddress}
      />

      <HeaderTitle>Время работы</HeaderTitle>
      <Row>
        <TextField
          sx={{ marginTop: '5px', marginBottom: '5px' }}
          fullWidth
          id='timeOpen'
          label='Открытие'
          size='small'
          type='time'
          name='timeOpen'
          value={state?.timeOpen}
          onChange={handleChangeData}
          InputLabelProps={{
            shrink: true,
          }}
          // inputProps={{
          //   step: 300, // 5 min
          // }}
        />
        <TextField
          sx={{ marginTop: '5px', marginBottom: '5px' }}
          fullWidth
          id='timeClose'
          label='Закрытие'
          size='small'
          type='time'
          name='timeClose'
          value={state?.timeClose}
          onChange={handleChangeData}
          InputLabelProps={{
            shrink: true,
          }}
          // inputProps={{
          //   step: 300, // 5 min
          // }}
        />
      </Row>
      <Row>
        <Button
          disabled={
            !state?.name ||
            !state?.restaurantAdress ||
            !state?.isActive ||
            !state?.timeClose ||
            !state?.timeOpen ||
            !state?.parentId
          }
          onClick={handleSave}
          variant='text'
        >
          Сохранить
        </Button>
        <Button onClick={handleCancel} color='error' variant='text'>
          Отмена
        </Button>
      </Row>
    </Wrapper>
  );
};

export default AddressData;
