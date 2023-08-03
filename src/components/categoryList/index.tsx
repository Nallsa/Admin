import { useState } from 'react';

import { List as MList } from '@mui/material';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { settings } from '../../ThemeStyle';
import Block from '../block';

import { ICategoryProducts } from '../../dto/products.dto';
import CategoryMenu from '../category/categoryMenu';

interface IProps {
  title?: string;
  items: ICategoryProducts[];
  children?: any;
  productNameFilter?: string;
  setProductNameFilter?: any;
  categoryProductsFilter?: string | null;
  setCategoryProductsFilter?: any;
}

const CategoryList: React.FC<IProps> = ({
  title,
  items,
  children,
  productNameFilter,
  setProductNameFilter,
  categoryProductsFilter,
  setCategoryProductsFilter,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number | null,
    id: string | null
  ) => {
    //это можно убрать, оставить только фильтр
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
    if (categoryProductsFilter === id) {
      setCategoryProductsFilter(null);
    } else {
      setCategoryProductsFilter(id);
    }
  };

  const handleSetFilter = (e: any): void => {
    setProductNameFilter(e.target.value);
  };

  return (
    <Block>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <TextField
          size='small'
          fullWidth
          id='outlined-basic'
          label='Поиск по товарам'
          variant='outlined'
          value={productNameFilter}
          onChange={handleSetFilter}
          style={{ marginBottom: '20px' }}
        />
        <Typography variant='h6' gutterBottom component='div'>
          {title}
        </Typography>
        <MList>
          {items?.map((item, index) => (
            <ListItemButton
              key={`${index}_${item.title}`}
              selected={selectedIndex === index}
              onClick={event => handleListItemClick(event, index, item.id!)}
              sx={{
                borderRadius: `${settings.borderRadius}px`,
                mb: 0.5,
                alignItems: 'center',
                py: 1,
              }}
            >
              <ListItemText primary={item.title} />
              <CategoryMenu item={item} />
            </ListItemButton>
          ))}
        </MList>
        {children}
      </Box>
    </Block>
  );
};

export default CategoryList;
