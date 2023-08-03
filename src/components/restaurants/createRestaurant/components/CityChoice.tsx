import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// import AddressService from 'dataStore/service/address.service'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useActions, useAppSelector } from '../../../../hooks/useActions';

interface IProps {
  state?: any;
  setState: (name: string, value: number | null) => void;
}

const CityChoice: FC<IProps> = ({ state, setState }) => {
  // const { cities } = useAppSelector(
  //   state => state.restaurantsReducer.restaurants
  // );
  const [selected, setSelect] = useState<any | null>(null);
  const { getAllCitiesByValue, getAllCities } = useActions();

  const firstFetch = (): void => {
    // if (state?.cityId) {
    //   AddressService.getCityById(state?.cityId).then(res => {
    //     setSelect(res?.data);
    //   });
    // }
    // if (cities?.length === 0) {
    //   getAllCities();
    // }
  };

  useEffect(() => {
    firstFetch();
  }, []);
  useEffect(() => {
    firstFetch();
  }, [state]);

  const handleChange = (event: React.ChangeEvent<any>, newValue: any) => {
    if (newValue?.id) {
      setState('cityId', Number(newValue?.id));
      setSelect(newValue);
    } else {
      setState('cityId', null);
      setSelect(null);
    }
  };

  const defaultProps = {
    options: [{ id: 1, city: 'da', isActive: false }],
    getOptionLabel: (option: any) =>
      `${option?.official_status?.substr(0, 3)}. ${option?.city}, ${
        option?.addr_region ? option?.addr_region : ''
      }`,
  };

  function debounce(callee: Function, timeoutMs: number) {
    let lastCall = 0;
    let lastCallTimer: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      let previousCall = lastCall;
      lastCall = Date.now();
      if (previousCall && lastCall - previousCall <= timeoutMs) {
        clearTimeout(lastCallTimer);
      }
      lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
    };
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    getAllCitiesByValue({ string: e.target.value });
  };

  const debouncedHandleChangeValue = debounce(handleChangeValue, 1000);
  return (
    <Autocomplete
      {...defaultProps}
      fullWidth
      size='small'
      disablePortal
      id='combo-box-demo'
      value={selected}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      renderInput={params => (
        <TextField
          sx={{ marginTop: '5px', marginBottom: '5px' }}
          onChange={debouncedHandleChangeValue}
          {...params}
          label={
            selected?.official_status ? selected?.official_status : 'Город'
          }
        />
      )}
    />
  );
};

export default CityChoice;
