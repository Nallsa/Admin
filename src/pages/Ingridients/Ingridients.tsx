import { Box } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IIngredient } from '../../dto/products.dto';
import IngredientCard from '../../components/ingredients';

const Ingridients = () => {
  const navigate = useNavigate();
  const ingredients: IIngredient[] = [
    {
      id: 30,
      price: 850,
      title: 'Корнишоны',
      article: '',
      img_url: 'image/a3b1f373-0a7f-43f9-976f-4f6cc5c49b83.jpg',
      addition: true,
      create_at: new Date(),
      is_active: true,
      update_at: new Date(),
      add_weight: {
        weight_l: 35,
        weight_s: 25,
        weight_xl: 45,
      },
      meta_title: null,
      price_type: 'kg',
      description: null,
      meta_robots: null,
      meta_keywords: null,
      meta_description: null,
    },
  ];
  const [nameFilter, setNameFilter] = useState<string>('');
  const [additionFilter, setAdditionFilter] = useState<boolean | null>(null);

  const handleCreateIngredient = (): void => {
    navigate('create_ingredient');
  };

  const handleAdditionFilter = (e: any): void => {
    e.target.name === 'all' && setAdditionFilter(null);
    e.target.name === 'ingredient' && setAdditionFilter(false);
    e.target.name === 'not' && setAdditionFilter(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ButtonGroup
            aria-label='small button group'
            sx={{ margin: '0px 10px 10px 0px', flexWrap: 'wrap' }}
          >
            <Button
              onClick={handleAdditionFilter}
              name='all'
              key='one'
              variant={additionFilter === null ? 'contained' : 'outlined'}
            >
              Все ({ingredients.length})
            </Button>
            <Button
              onClick={handleAdditionFilter}
              name='ingredient'
              key='two'
              variant={additionFilter === false ? 'contained' : 'outlined'}
            >
              Ингредиенты
            </Button>
            <Button
              onClick={handleAdditionFilter}
              name='not'
              key='three'
              variant={additionFilter === true ? 'contained' : 'outlined'}
            >
              Добавки ({ingredients.filter(el => el.addition).length})
            </Button>
          </ButtonGroup>

          <Button
            /* size="small" */
            variant='outlined'
            startIcon={<AddCircleOutlineIcon />}
            sx={{ margin: '0 10px 0px 0' }}
            onClick={handleCreateIngredient}
          >
            добавить ингредиент
          </Button>

          <TextField
            sx={theme => ({
              [theme.breakpoints.down('sm')]: {
                margin: '10px 0 0 0',
              },
            })}
            size='small'
            id='outlined-basic'
            label='Поиск ингредиента'
            variant='outlined'
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
          />
        </Grid>
        {ingredients
          ?.filter(el => {
            if (additionFilter === null) {
              return el;
            } else {
              return el.addition === additionFilter;
            }
          })
          .filter(el =>
            el.title.toLowerCase().includes(nameFilter.toLowerCase())
          )
          .sort((a, b) => {
            var textA = a.title.toUpperCase();
            var textB = b.title.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
          .map((ingredient, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <IngredientCard ingredient={ingredient} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Ingridients;
