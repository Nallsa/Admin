import { FC, lazy, SyntheticEvent, useEffect, useState } from 'react';

import { Wrapper } from './Styles.elements';
import { IRestaurant } from '../../../dto/restaurants.dto';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// import AddressData from './components/AddressData';
// import OwnerAndContacts from './components/OwnerAndContacts';
// import MapAndMetrica from './components/MapAndMetrica';
// import PaymentSettings from './components/PaymentSettings';
// import AccountingSystem from './components/AccountingSystem';
// import Delivery from './components/Delivery';

import { useActions } from '../../../hooks/useActions';
import Loadable from '../../Loadable';

// const Delivery = Loadable(lazy(() => import('./components/Delivery')));
// const AccountingSystem = Loadable(
//   lazy(() => import('./components/AccountingSystem'))
// );
// const PaymentSettings = Loadable(
//   lazy(() => import('./components/PaymentSettings'))
// );
// const MapAndMetrica = Loadable(
//   lazy(() => import('./components/MapAndMetrica'))
// );
const OwnerAndContacts = Loadable(
  lazy(() => import('./components/OwnerAndContacts'))
);
const AddressData = Loadable(lazy(() => import('./components/AddressData')));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface IProps {
  showForm: () => void;
  editData: IRestaurant | null;
}

export const newRestaurantStateObj: IRestaurant = {
  id: null,
  parentId: null,
  name: null,
  mapLink: null,
  restaurantAdress: {
    city: null,
    street: null,
    house: null,
    housing: null,
    description: null,
    floor: null,
  },
};

const CreateRestaurant: FC<IProps> = ({ showForm, editData }) => {
  const [restaurantState, setRestaurantState] = useState<IRestaurant>(
    newRestaurantStateObj
  );
  const [tabValue, setTabValue] = useState(0);

  const { createRestaurant, editRestaurantById } = useActions();

  const handleSave = (): void => {
    if (editData) {
      (async () => {
        const response = await editRestaurantById(restaurantState);
        if (response.payload) {
          return handleCancel();
        }
      })();
    } else {
      (async () => {
        delete restaurantState.id;
        const response = await createRestaurant(restaurantState);
        if (response.payload) {
          return handleCancel();
        }
      })();
    }
  };

  function handleCancel(): void {
    setRestaurantState(newRestaurantStateObj);
    showForm();
  }

  function handleChange(event: SyntheticEvent, newValue: number): void {
    setTabValue(newValue);
  }

  useEffect(() => {
    if (editData) {
      setRestaurantState(editData);
    }
  }, []);

  return (
    <>
      <Wrapper>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={tabValue}
          onChange={handleChange}
          aria-label='VerticalTabs'
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label='Адрес пиццерии' {...a11yProps(0)} />
          <Tab label='Владелец и контакты' {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <AddressData
            state={restaurantState}
            setState={setRestaurantState}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <OwnerAndContacts
            state={restaurantState}
            setState={setRestaurantState}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </TabPanel>
      </Wrapper>
    </>
  );
};

export default CreateRestaurant;
