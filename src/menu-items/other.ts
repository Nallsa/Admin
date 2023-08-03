import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import AddIcon from '@mui/icons-material/Add';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'pages',
  title: 'Страницы',
  type: 'group',
  children: [
    {
      id: 'pages',
      title: 'Страницы',
      type: 'item',
      url: '/pages',
      icon: MenuBookOutlinedIcon,
      breadcrumbs: false,
    },
    {
      id: 'restaurant',
      title: 'Рестораны',
      type: 'item',
      url: '/cafes',
      icon: StorefrontIcon,
      breadcrumbs: false,
    },

    {
      id: 'users',
      title: 'Пользователи',
      type: 'item',
      url: '/users',
      icon: GroupAddOutlinedIcon,
      breadcrumbs: false,
    },
    {
      id: 'questions',
      title: 'Запросы',
      type: 'item',
      url: '/questions',
      icon: BallotOutlinedIcon,
      breadcrumbs: false,
    },
    {
      id: 'settings',
      title: 'Настройки',
      type: 'item',
      url: '/settings',
      icon: SettingsOutlinedIcon,
      /* external: true,
            target: true */
    },
    {
      id: 'create element',
      title: 'Создание элементов',
      type: 'item',
      url: '/createElements',
      icon: AddIcon,
      /* external: true,
            target: true */
    },
  ],
};

export default other;
