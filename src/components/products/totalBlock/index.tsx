import { Grid } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ResultsCard from '../../resultsCard';
import { colors } from '../../../ThemeStyle';
import { useAppSelector } from '../../../hooks/useActions';
import { useNavigate } from 'react-router-dom';

const TotalBlock: React.FC = () => {
  const { products } = useAppSelector(state => state.productsReducer);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('create_product');
  };
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={products.length}
          text={'Всего товаров'}
          color={colors.info}
          Icon={DataUsageIcon}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          AddIcon={AddOutlinedIcon}
          text={'Создать новый'}
          color={colors.success}
          Icon={Inventory2OutlinedIcon}
          onClick={handleNavigate}
        />
      </Grid>
    </Grid>
  );
};

export default TotalBlock;
