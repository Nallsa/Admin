import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import PromoSearch from '../../../components/pages/promo/PromoSearch';
import { Row } from '../../../components/styledComponets/Styled.elements';
import { useActions, useAppSelector } from '../../../hooks/useActions';
import { IPromo } from '../../../dto/promo.dto';
import CreatePromo from '../../../components/pages/promo/CreatePromo';
import { Grid } from '@mui/material';
import PromoCard from '../../../components/pages/promo/promoCard';

const Promo: React.FC = () => {
  const { getAllPromo } = useActions();
  const { promo } = useAppSelector(state => state.promoReducer);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [editPromo, setEditPromo] = useState<IPromo | null>(null);
  const [promoFilter, setPromoFilter] = useState<string>('');

  useEffect(() => {
    getAllPromo();
  }, []);

  return (
    <div>
      <Row gap={10} mb={25}>
        <Button
          size='small'
          variant='outlined'
          onClick={() => setShowCreate(!showCreate)}
        >
          + Создать
        </Button>
        <PromoSearch
          promoFilter={promoFilter}
          setPromoFilter={setPromoFilter}
        />
      </Row>

      {showCreate || editPromo ? (
        <CreatePromo
          setShow={setShowCreate}
          editPromo={editPromo}
          setEditPromo={setEditPromo}
        />
      ) : (
        <Grid container spacing={3}>
          {promo
            ?.filter(el =>
              el?.title.toLowerCase().includes(promoFilter.toLowerCase())
            )
            .map((pr, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <PromoCard promo={pr} setEditPromo={setEditPromo} />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};

export default Promo;
