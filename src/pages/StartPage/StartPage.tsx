import { Box, Typography } from '@mui/material';
import OrdersTable from '../../components/ordersPage/index';
import { useEffect } from 'react';
import axios from 'axios';

const StartPage = () => {
  async function fetch() {
    const res2 = await axios.post(
      'https://api2.bybit.com/fiat/otc/item/online',
      {
        amount: '',
        authMaker: false,
        canTrade: false,
        currencyId: 'RUB',
        page: '1',
        payment: [],
        side: '1',
        size: '20',
        tokenId: 'USDT',
        userId: 75111536,
      }
    );

    console.log(res2);
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <OrdersTable />
    </Box>
  );
};

export default StartPage;
