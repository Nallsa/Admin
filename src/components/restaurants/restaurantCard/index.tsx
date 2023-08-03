import { IRestaurant } from '../../../dto/restaurants.dto';
import React from 'react';
import ItemMenu from '../itemMenu';
import {
  Column,
  Contacts,
  HeaderTitle,
  Row,
  Wrapper,
  ColumnsContainer,
} from './Styles.elements';
import { useAppSelector } from '../../../hooks/useActions';

interface IProps {
  restaurant: IRestaurant;
  edit: Function;
}

const RestaurantCard: React.FC<IProps> = ({ restaurant, edit }) => {
  const { admins } = useAppSelector(state => state.usersReducer);
  return (
    <Wrapper>
      <ColumnsContainer>
        <Column>
          <Row>
            <HeaderTitle>
              Название:
              {restaurant?.name ?? 'Рестораны'}
            </HeaderTitle>
          </Row>
        </Column>
        <Column>
          <Contacts>
            Адресс:
            <HeaderTitle>
              {`${restaurant.restaurantAdress.city}, ${restaurant.restaurantAdress.street}, ${restaurant.restaurantAdress.house}`}
            </HeaderTitle>
          </Contacts>
        </Column>
        <Column>
          <Contacts>
            Администраторы:
            <HeaderTitle>
              {admins?.filter(i => i.id === restaurant.parentId)[0].firstName}
            </HeaderTitle>
          </Contacts>
        </Column>
      </ColumnsContainer>
      <ItemMenu edit={edit} item={restaurant} />
    </Wrapper>
  );
};

export default RestaurantCard;
