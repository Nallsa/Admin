import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import CategoryList from '../../components/categoryList';
import ProductList from '../../components/products/productList';
import TotalBlock from '../../components/products/totalBlock';
import { settings } from '../../ThemeStyle';
import { useNavigate } from 'react-router-dom';
import { ICategoryProducts } from '../../dto/products.dto';
import { useActions, useAppSelector } from '../../hooks/useActions';

const Products = () => {
  const navigate = useNavigate();
  const {
    getAllCategoryProducts,
    getAllProducts,
    getAllRestaurants,
    getAllMeasureUnits,
  } = useActions();
  const { categoryProducts } = useAppSelector(state => state.productsReducer);

  const [productNameFilter, setProductNameFilter] = useState<string>('');
  const [categoryProductsFilter, setCategoryProductsFilter] = useState<
    string | null
  >(null);

  // const nest = (items: any[], id = null, link = 'parentId'): any[] =>
  //   items
  //     .filter(item => item[link] === id)
  //     .map(item => ({ ...item, children: nest(items, item.id) }));

  // console.log(nest(categoryProducts));

  useEffect(() => {
    Promise.all([
      getAllCategoryProducts(),
      getAllProducts(),
      getAllRestaurants(),
      getAllMeasureUnits(),
    ]);
  }, []);

  const handleCreateCategory = (): void => {
    navigate('/products/create_categoryProducts');
  };
  return (
    <Box>
      <TotalBlock />
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <CategoryList
            items={categoryProducts}
            title='Категории'
            productNameFilter={productNameFilter}
            setProductNameFilter={setProductNameFilter}
            categoryProductsFilter={categoryProductsFilter}
            setCategoryProductsFilter={setCategoryProductsFilter}
          >
            <Button fullWidth onClick={handleCreateCategory}>
              + Создать категорию
            </Button>
          </CategoryList>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={6}
          md={9}
          spacing={3}
          sx={{
            maxHeight: `${settings.productsWrapper}vh`,
            overflowY: 'scroll',
            paddingBottom: 2,
          }}
        >
          <ProductList
            productNameFilter={productNameFilter}
            categoryProductsFilter={categoryProductsFilter}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default Products;
