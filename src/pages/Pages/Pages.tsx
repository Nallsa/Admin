import { useState } from 'react';
import { Grid } from '@mui/material';
import PagesList from '../../components/pages/pagesList';
import Promo from './Promo';

const pages = [{ title: 'Акции', page: 'Promo' }];

const Pages: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>('Promo');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <PagesList
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          pages={pages}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={9}>
        {selectedPage === 'Promo' && <Promo />}
      </Grid>
    </Grid>
  );
};

export default Pages;
