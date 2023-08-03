import { FC, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { InputWrapper, Item, Wrapper } from './Styles.elements';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CreateComponent from './CreateComponent';
import {
  IDeliveryType,
  IMeasureUnit,
  IPayment,
  IPaymentStatus,
  IStatus,
} from '../../../dto/elements.dto';
import { Label } from '../../usersPage/createUser/Styles.elements';

const initialState = { id: null, title: '' };

interface IProps {
  createType: string;
  listType: string;
  editType: string;
  inputType: string;
  state:
    | IMeasureUnit[]
    | IStatus[]
    | IPaymentStatus[]
    | IPayment[]
    | IDeliveryType[];
  getAllElemnt: Function;
  createElement: Function;
  editElement: Function;
  deleteElement: Function;
}

const ElementTypes: React.FC<IProps> = ({
  createType,
  listType,
  editType,
  inputType,
  state,
  getAllElemnt,
  createElement,
  editElement,
  deleteElement,
}) => {
  const [newElement, setNewElement] = useState<
    IMeasureUnit | IStatus | IPaymentStatus | IPayment | IDeliveryType
  >(initialState);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    getAllElemnt();
  }, []);

  const handleCreateElement = (): void => {
    delete newElement.id;
    createElement(newElement);
  };

  const handleEditElement = (): void => {
    if (newElement.id) {
      (async () => {
        const response = await editElement(newElement);
        if (response.payload) {
          handleClose();
        }
      })();
      return;
    }
  };
  const handleDeleteElement = (): void => {
    if (newElement.id) {
      (async () => {
        const response = await deleteElement(newElement.id);
        if (response.payload) {
          handleClose();
        }
      })();
      return;
    }
  };

  const handleClickOpen = (status: any) => {
    setNewElement(status);
    setOpen(true);
  };

  const clearState = () => {
    setNewElement(initialState);
  };

  const handleClose = () => {
    clearState();
    setOpen(false);
  };

  return (
    <Wrapper>
      <Label
        style={{
          marginBottom: '20px',
        }}
      >
        {createType}
      </Label>
      <InputWrapper>
        <CreateComponent
          inputType={inputType}
          state={newElement}
          setState={setNewElement}
        />
        <Button variant='text' onClick={handleCreateElement}>
          Добавить
        </Button>
      </InputWrapper>
      {state?.length === 0 ? <></> : <>{listType}</>}
      {state?.map(element => (
        <Item key={element.id} onClick={() => handleClickOpen(element)}>
          {element.title}
        </Item>
      ))}
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>{editType}</DialogTitle>
        <DialogContent>
          <InputWrapper style={{ margin: '5px 0' }}>
            <CreateComponent
              inputType={inputType}
              state={newElement}
              setState={setNewElement}
            />
          </InputWrapper>
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={handleEditElement}>
            Сохранить
          </Button>
          <Button variant='text' onClick={handleDeleteElement} color='error'>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default ElementTypes;
