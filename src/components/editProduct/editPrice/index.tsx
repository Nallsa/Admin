import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { InputAdornment, TextField } from '@mui/material';
import { IProduct, IRestaurantPrice } from '../../../dto/products.dto';
import { IRestaurant } from '../../../dto/restaurants.dto';
import { useActions, useAppSelector } from '../../../hooks/useActions';
import { FC, useEffect } from 'react';
import { DivLabel, InputRow, Label, Wrapper } from './Style.elements';

interface IProp {
  setProductState: Function;
  productState: IProduct;
}

const EditPrice: FC<IProp> = ({ productState, setProductState }) => {
  const { restaurants } = useAppSelector(state => state.restaurantsReducer);

  const { getAllRestaurants } = useActions();

  useEffect(() => {
    getAllRestaurants();
  }, []);

  const handleChangeSinglePrice = (e: any, restaurant: IRestaurant): void => {
    if (productState?.restaurantPrice) {
      if (
        Boolean(
          productState.restaurantPrice.find(rPrice => {
            return rPrice.restaurantId === restaurant.id;
          })
        )
      ) {
        const restaurantPrice = productState?.restaurantPrice
          .map(rPrice => {
            if (rPrice.restaurantId === restaurant.id) {
              return {
                ...rPrice,
                price: e.target.value,
                restaurantId: restaurant.id,
                productsId: productState.id,
              };
            }
            return rPrice;
          })
          .flat();

        setProductState((prev: IProduct) => ({
          ...prev,
          restaurantPrice: restaurantPrice,
        }));
      } else {
        setProductState((prev: IProduct) => ({
          ...prev,
          restaurantPrice: [
            ...productState?.restaurantPrice!,
            {
              price: e.target.value,
              restaurantId: restaurant.id,
              productsId: productState.id,
            },
          ],
        }));
      }
    } else {
      setProductState((prev: IProduct) => ({
        ...prev,
        restaurantPrice: [
          {
            price: e.target.value,
            restaurantId: restaurant.id,
            productsId: productState.id,
          },
        ],
      }));
    }
  };

  return (
    <div>
      {restaurants?.map(restaurant => (
        <Wrapper key={restaurant.id}>
          <DivLabel>
            <Label>{restaurant?.name}</Label>
            <Label>{restaurant?.address}</Label>
          </DivLabel>

          <>
            <TextField
              size='small'
              name='restaurantPrice'
              label='Цена'
              value={
                productState?.restaurantPrice?.filter(
                  el => el?.restaurantId === restaurant?.id
                )[0]?.price ?? 0
              }
              onChange={e => handleChangeSinglePrice(e, restaurant)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CurrencyRubleIcon />
                  </InputAdornment>
                ),
              }}
            />
          </>
        </Wrapper>
      ))}
    </div>
  );
};

export default EditPrice;
