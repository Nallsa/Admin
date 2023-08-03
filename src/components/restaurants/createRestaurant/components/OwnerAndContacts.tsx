import { ChangeEvent, FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdminData from './AdminData';
import ChangeStatus from './ChangeStatus';
import { Wrapper, HeaderTitle, Row } from './Styles.elements';
import { useActions, useAppSelector } from '../../../../hooks/useActions';
import { IRestaurant } from '../../../../dto/restaurants.dto';

interface IProps {
  state: IRestaurant | null;
  setState: Function;
  handleSave: () => void;
  handleCancel: () => void;
}

const OwnerAndContacts: FC<IProps> = ({
  state,
  setState,
  handleSave,
  handleCancel,
}) => {
  const handleChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IRestaurant) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <HeaderTitle>Владелец</HeaderTitle>
      <AdminData state={state} setState={setState} />
      <TextField
        value={state?.contactEmail}
        name='contactEmail'
        onChange={handleChangeData}
        sx={{ marginTop: '5px', marginBottom: '5px' }}
        size='small'
        id='outlined-basic-contactEmail'
        label='Email для уведомлений о заказе'
        fullWidth
        variant='outlined'
        type='email'
      />

      <HeaderTitle>Статус Ресторана</HeaderTitle>
      <ChangeStatus state={state} setState={setState} />

      {/* <AddContact
        state={state?.contacts}
        setState={handleChangeContacts}
        deleteContactById={handleDeleteContact}
      /> */}

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

export default OwnerAndContacts;
