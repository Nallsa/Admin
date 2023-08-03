import { Box, Card, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// import { API_URL } from 'dataStore/api'
// import LoadableImage from '../../../loadableImage'

import { settings, shadows } from '../../../../ThemeStyle';
import PromoMenu from '../promoMenu';

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

interface IProps {
  promo?: any;
  setEditPromo: Function;
}

const PromoCard: React.FC<IProps> = ({ promo, setEditPromo }) => {
  return (
    <Card
      sx={{
        borderRadius: settings.blockBorderRadius,
        boxShadow: shadows.small,
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* <ProductImgStyle alt={ingredient?.title} src={ingredient?.img_url ? `${API_URL}/${ingredient?.img_url}` : ''} loading="lazy" /> */}
        <div
          style={{
            top: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        >
          {/* {promo?.img_small && (
            <LoadableImage
              alt={promo?.title}
              src={promo?.img_small ? `${API_URL}/${promo?.img_small}` : ''}
            />
          )} */}
        </div>
      </Box>
      <Stack
        spacing={2}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Typography variant='subtitle2' noWrap>
              {promo?.title}
            </Typography>
          </Box>
          <PromoMenu item={promo} setEditPromo={setEditPromo} />
        </Box>
      </Stack>
    </Card>
  );
};

export default PromoCard;
