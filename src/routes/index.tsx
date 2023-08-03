import { useRoutes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import { selectIsAuth } from '../redux/slices/AuthSlice';
import { useSelector } from 'react-redux';
import StartPage from '../pages/StartPage/StartPage';
import Cafes from '../pages/Cafes/Cafes';
import Ingridients from '../pages/Ingridients/Ingridients';
import Pages from '../pages/Pages/Pages';
import Products from '../pages/Products/Products';
import Questions from '../pages/Questions/Questions';
import Settings from '../pages/Settings/Settings';
import CreateElements from '../pages/CreateElements/CreateElements';
import Users from '../pages/Users/Users';
import Profile from '../pages/Profile/Profile';
import MainLayout from '../layout/MainLayout/MainLayout';
import CreateCategoryProducts from '../pages/Products/CreateCategoryProducts';
import CreateProduct from '../pages/Products/CreateProduct';

function Routs() {
  const isAuth: boolean = useSelector(selectIsAuth);

  let mainLayoutRouts = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <StartPage />,
      },

      {
        path: '/cafes',
        element: <Cafes />,
      },
      {
        path: '/pages',
        element: <Pages />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: 'products/create_categoryProducts',
        element: <CreateCategoryProducts />,
      },
      {
        path: 'products/create_product',
        element: <CreateProduct />,
      },

      {
        path: '/questions',
        element: <Questions />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/createElements',
        element: <CreateElements />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  };

  const authRoutes = {
    path: '/',
    element: <Login />,
  };

  let routs = useRoutes([isAuth ? mainLayoutRouts : authRoutes]);

  return routs;
}

export default Routs;
