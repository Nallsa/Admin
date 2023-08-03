// assets
import { TbKey } from 'react-icons/tb'

// constant
const icons = {
  TbKey,
}

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Страницы',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'Страницы',
      title: 'pages',
      type: 'collapse',
      icon: icons.TbKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: true,
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true,
        },
      ],
    },
  ],
}

export default pages
