import { FC, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { InputWrapper, Item, Wrapper } from './Styles.elements';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// import { IOrderStatus } from '../../../dto/orders.dto';
import { ColorTypes } from '../../chip/Styles.elements';
import CreateComponent from './CreateComponent';

const colors = ColorTypes;

const initialState = { description: '', color: '' };

const ProductTypes: FC = () => {
  const [newStatus, setNewStatus] = useState<any>(initialState);
  const [open, setOpen] = useState<boolean>(false);

  const createStatus = (): void => {};

  const handleEditStatus = (): void => {
    if (newStatus.id) {
      handleClose();
    }
  };
  const handleDeleteStatus = (): void => {
    if (newStatus.id) {
      handleClose();
    }
  };

  const clearState = () => {
    setNewStatus(initialState);
  };

  const handleClickOpen = (status: any) => {
    setNewStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    clearState();
    setOpen(false);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <CreateComponent state={newStatus} setState={setNewStatus} />
        <Button variant='text' onClick={createStatus}>
          Добавить
        </Button>
      </InputWrapper>
      Список статусов
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Редактирование статуса</DialogTitle>
        <DialogContent>
          <InputWrapper style={{ margin: '5px 0' }}>
            <CreateComponent state={newStatus} setState={setNewStatus} />
          </InputWrapper>
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={handleEditStatus}>
            Сохранить
          </Button>
          <Button variant='text' onClick={handleDeleteStatus} color='error'>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default ProductTypes;
