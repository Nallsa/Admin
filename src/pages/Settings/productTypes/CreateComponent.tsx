import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { IOrderStatus } from '../../../dto/orders.dto';
import { ChangeEvent, FC } from 'react';
import { ColorTypes } from '../../../components/chip/Styles.elements';

import { Item } from './Styles.elements';

interface IProps {
  state: IOrderStatus;
  setState: Function;
}

const colors = ColorTypes;

const CreateComponent: FC<IProps> = ({ state, setState }) => {
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IOrderStatus) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeColor = (e: SelectChangeEvent) => {
    setState((prev: IOrderStatus) => ({ ...prev, color: e.target.value }));
  };

  return (
    <>
      <TextField
        fullWidth
        id='description'
        name='description'
        value={state.description}
        label='Статус'
        variant='outlined'
        size='small'
        onChange={handleChangeDescription}
      />
      <FormControl size='small' fullWidth>
        <InputLabel id='color-select-small'>Цвет</InputLabel>
        <Select
          labelId='color-select-small'
          id='color-select-small'
          value={state.color}
          label='Цвет'
          onChange={handleChangeColor}
        >
          <MenuItem value=''>Без цвета</MenuItem>
          {Object.values(colors)?.map(color => (
            <Item key={color} value={color} $color={color}>
              {color}
            </Item>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CreateComponent;
