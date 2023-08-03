import { Grid } from '@mui/material';
import ProductCard from '../productCard';
import { IProduct } from '../../../dto/products.dto';
import { useActions, useAppSelector } from '../../../hooks/useActions';
import { useEffect } from 'react';

interface IProps {
  productNameFilter: string;
  categoryProductsFilter: string | null;
}

const ProductList: React.FC<IProps> = ({
  productNameFilter,
  categoryProductsFilter,
}) => {
  const { getAllProducts } = useActions();
  const { products } = useAppSelector(state => state.productsReducer);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {products
        .filter(el => {
          if (categoryProductsFilter) {
            return el.categoryProductsId === categoryProductsFilter;
          } else {
            return el;
          }
        })
        .filter(el =>
          el.title.toLowerCase().includes(productNameFilter.toLowerCase())
        )
        .sort((a, b) => {
          var textA = a.title.toUpperCase();
          var textB = b.title.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        })
        .map(product => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
    </>
  );
};

export default ProductList;
