import { FC, ReactElement, Ref, useEffect, useState, forwardRef } from 'react';

import TotalBlock from './totalBlock';

import OrderTable from './ordersTable/Table';
import PizzeriaFilter from './ordersTable/PizzeriaFilter';
import OrderDetails from './ordersTable/OrderDetails/OrderDetails';

import {
  AppBar,
  Button,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface IProps {
  setEditState?: Function;
}

const OrdersTable: FC<IProps> = () => {
  const orders: any[] = [
    {
      id: '1',
      customer: {
        firstName: 'Aslan',
        phone: '+79183995830',
      },
      restaurantId: '1',
      restaurant: {
        id: '1',
        address: 'Кучуры 8',
        name: 'Kayto',
      },
      userId: '22',
      orderNumber: '1',
      orderDate: '13.06.2023',
      orderTime: '13.06.2023',
      orderType: '',
      orderSum: 2000,
      paymentType: 'Оплачено',
      paymentStatusId: '222',
      paymentStatus: '',
      goods: [
        {
          id: '1',
          orderId: '1',
          userId: '22',
          goodsId: '1',
          price: 2000,
        },
      ],
    },
    {
      id: '1',
      restaurantId: '1',
      restaurant: {
        id: '1',
        address: 'Кучуры 9',
        name: 'Kayto',
      },
      userId: '22',
      orderNumber: '1',
      orderDate: '13.06.2023',
      orderTime: '13.06.2023',
      orderType: '',
      orderSum: 3000,
      paymentType: 'Оплачено',
      paymentStatusId: '222',
      goods: [
        {
          id: '1',
          orderId: '1',
          userId: '22',
          goodsId: '1',
          price: 3000,
        },
      ],
    },
  ];

  const [selected, setSelected] = useState<any | null>(null);
  const [filterData, setFilterData] = useState({
    restourantId: null,
    paymentStatusId: null,
  });
  // const { getAllOrderStatus } = useActions();
  // const { parentId, userId } = useRole();

  /* const filterData = [{ type: 'pizzeria_id', value: 10 }, {type:'payment_status', value: 'Не оплачено'}] */

  /* const [uniqCity, setUniqCity] = useState<any>(getUniqueCityArr(orders)) */

  // useEffect(() => {
  //   getAllOrderStatus();
  // }, []);

  /* useEffect(() => {
    if (orders.length > 0) {
      setUniqCity(getUniqueCityArr(orders))
    }
  }, [orders]) */

  const handleClose = (): void => {
    setSelected(null);
  };

  const handleOpen = (order: any): void => {
    setSelected(order);
  };

  // const pizzeriaUserFilter = (): any[] | null => {
  //   if (userId) {
  //     if (!parentId) return [...orders];
  //     return [...orders]?.filter(
  //       order =>
  //         order?.pizzeria?.ownerId === userId ||
  //         order?.pizzeria?.adminsIds!.includes(userId)
  //     );
  //   }
  //   return null;
  // };

  // const ordersFilter = (): any[] | null => {
  //   // if (!pizzeriaUserFilter()) return null;
  //   if (filterData?.restourantId) {
  //     return (
  //       pizzeriaUserFilter()?.filter((order: any) => {
  //         return order.pizzeria_id === filterData?.pizzeria_id;
  //       }) ?? null
  //     );
  //   } else {
  //     return pizzeriaUserFilter();
  //   }
  // };

  return (
    <Container>
      <TotalBlock orders={orders} />
      <PizzeriaFilter />
      <OrderTable orders={orders} setState={setSelected} />

      <Dialog
        disableEscapeKeyDown
        open={Boolean(selected)}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Данные заказа
            </Typography>
            <Button autoFocus color='inherit' onClick={handleClose}>
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <OrderDetails state={selected} />
      </Dialog>
    </Container>
  );
};

export default OrdersTable;
