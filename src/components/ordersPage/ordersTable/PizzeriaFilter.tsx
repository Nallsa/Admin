import { FC, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { IRestaurant } from '../../../dto/restaurants.dto';

interface IProps {}

const PizzeriaFilter: FC<IProps> = () => {
  const restaurants: IRestaurant[] = [
    {
      id: '1',
      address: 'Кучуры 8',
      name: 'Kayto',
    },
    {
      id: '2',
      address: 'Кучуры 9',
      name: 'Kayto2',
    },
  ];
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [options, setOptions] = useState([{ id: 0, value: 'Все рестораны' }]);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <>
      <ButtonGroup
        variant='contained'
        ref={anchorRef}
        aria-label='split button'
        sx={{ marginBottom: 3 }}
      >
        <Button onClick={handleToggle}>
          {options?.find(el => el?.id === selectedIndex)?.value}
        </Button>
        <Button
          size='small'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <MenuList id='split-button-menu' autoFocusItem>
                {options.map((option, index) => (
                  <MenuItem
                    key={option.id}
                    selected={option.id === selectedIndex}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default PizzeriaFilter;
