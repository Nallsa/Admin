import { Grid } from '@mui/material';
import { FC } from 'react';
import ResultsCard from '../../resultsCard';
import { colors } from '../../../ThemeStyle';
// import { IOrder } from '../../../dto/orders.dto';

interface IProp {
  orders: any[] | null;
}

const TotalBlock: FC<IProp> = ({ orders }) => {
  if (!orders) return <></>;

  return (
    <Grid container spacing={3} sx={{ mb: '25px' }}>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={orders.length}
          text={'Всего заказов'}
          color={colors.info}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={orders?.length}
          text={'Новых заказов'}
          color={colors.warning}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={orders?.length}
          text={'Заказов в работе'}
          color={colors.danger}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard total={0} text={'Сумма'} color={colors.success} />
      </Grid>
    </Grid>
  );
};

export default TotalBlock;
