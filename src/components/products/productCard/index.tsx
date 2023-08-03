import { Box, Card, Stack, Typography } from '@mui/material';
import { IProduct } from '../../../dto/products.dto';
import { settings, shadows } from '../../../ThemeStyle';
import ProductMenu from '../productMenu';
import ContentLoader from 'react-content-loader';

interface IProps {
  product: IProduct;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
  return (
    <Card
      sx={{
        borderRadius: settings.blockBorderRadius,
        boxShadow: shadows.small,
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <div
          style={{
            top: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        >
          {product.image !== '' ? (
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src=''
              alt=''
            />
          ) : (
            <ContentLoader
              speed={2}
              width={'100%'}
              height={'100%'}
              viewBox='0 0 100% 100%'
              backgroundColor='#f3f3f3'
              foregroundColor='#ecebeb'
            >
              <rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
            </ContentLoader>
          )}
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
            <Typography style={{ fontSize: '17px' }} variant='subtitle2' noWrap>
              {product.title}
            </Typography>
          </Box>
        </Box>
        <ProductMenu item={product} />
      </Stack>
    </Card>
  );
};

export default ProductCard;
