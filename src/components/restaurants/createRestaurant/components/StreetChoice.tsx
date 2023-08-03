import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// import AddressService from 'dataStore/service/address.service';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useActions, useAppSelector } from '../../../../hooks/useActions';

interface IProps {
  state: any;
  setState: (name: string, value: number | null) => void;
}

const StreetChoice: FC<IProps> = ({ state, setState }) => {
  // const { streets } = useAppSelector((state) => state);
  const [selected, setSelect] = useState<any | null>(null);
  const { getStreetsById } = useActions();

  // const fetchHandler = async () => {
  //   if (state?.streetId) {
  //     AddressService.getStreetById(state?.streetId).then(res => {
  //       setSelect(res?.data);
  //     });
  //   }
  //   return await getStreetsById({ id: state?.cityId });
  // };

  useEffect(() => {
    // fetchHandler();
  }, [state?.cityId]);

  const defaultProps = {
    options: {},
    getOptionLabel: (option: any) => option?.street,
  };

  const handleChange = (event: React.ChangeEvent<any>, newValue: any) => {
    if (newValue?.id) {
      setState('streetId', Number(newValue?.id));
      setSelect(newValue);
    } else {
      setState('streetId', null);
      setSelect(null);
    }
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
    getStreetsById({ id: state.cityId, street: e.target.value });
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
          label='Улица'
        />
      )}
    />
  );
};

export default StreetChoice;
