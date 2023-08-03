import { FC, useState, MouseEvent, useEffect } from 'react';
// import { API_URL } from '../../../../dataStore/api';
// import { IOrder } from '../../../../dto/orders.dto';
import { ColorTypes } from '../../../chip/Styles.elements';
import GoodCard from '../goodCard';
import {
  OrderWrapper,
  OrderSection,
  GoodsWrapper,
  OrderInfo,
  Title,
} from '../../Styles.elements';
import Chip from '../../../chip/index';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
// import { RootState } from '../../../../dataStore/state';
import { useActions } from '../../../../hooks/useActions';
// import { IOrderStatus } from '../../../../dto/orders.dto';
import moment from 'moment';

interface IProps {
  state?: any | null;
}

const OrderDetails: FC<IProps> = ({ state }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElPayStatus, setAnchorElPayStatus] =
    useState<null | HTMLElement>(null);
  const [status, setStatus] = useState(state?.status_obj);
  const open = Boolean(anchorEl);
  const openPayStatus = Boolean(anchorElPayStatus);
  // const { statuses, orders } = useSelector((state: RootState) => state.orders);

  console.log(anchorElPayStatus);

  const statuses: any = [];
  const orders: any = [];

  const { editOrder } = useActions();

  useEffect(() => {
    if (state) {
      const order = orders?.find((el: { id: any }) => el.id === state.id);
      setStatus(order?.status_obj);
    }
  }, [orders]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickPayStatus = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorElPayStatus(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosePayStatus = () => {
    setAnchorElPayStatus(null);
  };

  const handleSave = (data: any): void => {
    if (state) {
      editOrder({ id: state?.id, status: data?.id });
    }
    handleClose();
  };
  const handleSavePayStatus = (data: string): void => {
    if (state) {
      editOrder({ id: state?.id, paymentStatus: data });
    }
    handleClosePayStatus();
  };
  console.log(state);

  if (!state) {
    return <></>;
  }
  return (
    <OrderWrapper>
      <OrderSection>
        <OrderInfo>
          <Title>Пиццерия:</Title> {state?.restaurant?.address},{' '}
          {state?.pizzeria?.address?.street}
        </OrderInfo>
        <OrderInfo>
          <Title>Сумма:</Title> {state?.orderSum} ₽
        </OrderInfo>
        <OrderInfo>
          <Title>Создан в:</Title> {moment(state?.create_at).format('LLLL')}
        </OrderInfo>
        <OrderInfo>
          <Title>Акция:</Title> {state?.promo}
        </OrderInfo>
        <OrderInfo>
          <Title>Покупатель:</Title> {state?.customer?.firstName}{' '}
          {state?.customer?.lastName}
        </OrderInfo>
        <OrderInfo>
          <Title>Доставить по адресу:</Title> {state?.address || ''}
        </OrderInfo>
        <OrderInfo>
          <Title>Номер телефона:</Title> {state?.customer?.phone}
        </OrderInfo>
        <OrderInfo>
          <Title>email:</Title> {state?.customer?.email}
        </OrderInfo>
        <OrderInfo>
          <Title>Сообщение:</Title> {state?.message}
        </OrderInfo>
        <OrderInfo>
          <Title>Тип оплаты:</Title> {state?.paymentType}
        </OrderInfo>
        <OrderInfo>
          <Title>Статус оплаты:</Title>
          <div onClick={handleClickPayStatus}>
            <Chip color={ColorTypes['light_blue']}>{state?.paymentStatus}</Chip>
          </div>
        </OrderInfo>

        <OrderInfo>
          <Title>Статус заказа:</Title>
          <>
            {status && (
              <div onClick={handleClick}>
                <Chip
                  color={ColorTypes[status?.color as keyof typeof ColorTypes]}
                >
                  {status?.description}
                </Chip>
              </div>
            )}
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {statuses?.map(el => (
                <MenuItem key={el?.id} onClick={() => handleSave(el)}>
                  {el?.description}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              id='basic-menu'
              anchorEl={anchorElPayStatus}
              open={openPayStatus}
              onClose={handleClosePayStatus}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                key={'1'}
                onClick={() => handleSavePayStatus('Не оплачено')}
              >
                Не оплачено
              </MenuItem>
              <MenuItem
                key={'2'}
                onClick={() => handleSavePayStatus('Оплачено')}
              >
                Оплачено
              </MenuItem>
              <MenuItem
                key={'3'}
                onClick={() => handleSavePayStatus('Отменено')}
              >
                Отменено
              </MenuItem>
            </Menu>
          </>
        </OrderInfo>
      </OrderSection>
      {/* /////// */}
      <OrderSection style={{ width: '100%' }}>
        <OrderInfo>
          <Title>Позиции в заказе:</Title>
        </OrderInfo>
        <GoodsWrapper>
          {state?.goods?.map(good => (
            <GoodCard key={good.id} good={good} />
          ))}
        </GoodsWrapper>
      </OrderSection>
    </OrderWrapper>
  );
};

export default OrderDetails;
