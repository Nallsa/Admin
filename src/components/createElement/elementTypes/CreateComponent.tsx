import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { ChangeEvent, FC } from 'react';
import { ColorTypes } from '../../chip/Styles.elements';

import { Item } from './Styles.elements';

interface IProps {
  state: any;
  setState: Function;
  inputType: string;
}

const CreateComponent: FC<IProps> = ({ state, setState, inputType }) => {
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <TextField
        fullWidth
        id='title'
        name='title'
        value={state.title}
        label={inputType}
        variant='outlined'
        size='small'
        onChange={handleChangeDescription}
      />
    </>
  );
};

export default CreateComponent;
