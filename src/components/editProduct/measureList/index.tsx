import { useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useActions, useAppSelector } from '../../../hooks/useActions';
import { Input, Label } from './Form.elements';
import { IMeasureUnit } from '../../../dto/elements.dto';
import { IProduct } from '../../../dto/products.dto';
import { InputRow } from '../editForm/Form.elements';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface IProp {
  setProductState: Function;
  productState: IProduct;
  setSelectedMeasureUnit: Function;
  selectedMeasureUnit: IMeasureUnit | null;
}

const MeasureList: React.FC<IProp> = ({
  setProductState,
  productState,
  selectedMeasureUnit,
  setSelectedMeasureUnit,
}) => {
  const { measureUnits } = useAppSelector(state => state.elementsReducer);
  const { getAllMeasureUnits } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (measureUnits.length === 0) {
      getAllMeasureUnits();
    }

    if (productState.measurementUnitId) {
      setSelectedMeasureUnit(
        measureUnits.filter(el => el.id === productState.measurementUnitId)[0]
      );
    }
  }, [productState]);

  const handleChangeMultiple = (event: any, value: any) => {
    setSelectedMeasureUnit(value);
    if (value) {
      setProductState((prev: IProduct) => ({
        ...prev,
        measurementUnitId: value.id,
      }));
    }
  };

  return (
    <>
      <Input
        onClick={() => {
          if (measureUnits.length == 0) {
            toast.error(
              `Создайте единицу измерения в вкладке создание элементов`
            );
            setTimeout(() => {
              return navigate('/createElements');
            }, 2000);
          }
        }}
      >
        <Label>Единица измерения</Label>
        <Autocomplete
          size='small'
          id='category-outlined'
          options={measureUnits}
          getOptionLabel={option => option.title!}
          filterSelectedOptions
          value={selectedMeasureUnit}
          onChange={handleChangeMultiple}
          renderInput={params => <TextField {...params} />}
          disabled={measureUnits.length == 0}
        />
      </Input>
    </>
  );
};

export default MeasureList;
