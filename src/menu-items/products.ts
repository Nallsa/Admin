// assets
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'products',
  title: 'Продукты',
  type: 'group',
  children: [
    {
      id: 'products',
      title: 'Товары',
      type: 'item',
      url: '/products',
      icon: LocalPizzaOutlinedIcon,
      breadcrumbs: false,
    },
  ],
};

export default utilities;
