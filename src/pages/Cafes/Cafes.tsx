import { Button } from '@mui/material';
import RestaurantCard from '../../components/restaurants/restaurantCard';
import { useActions, useAppSelector } from '../../hooks/useActions';
import { useEffect, useState } from 'react';
import { IRestaurant } from '../../dto/restaurants.dto';
import CreateRestaurant from '../../components/restaurants/createRestaurant';

const Cafes = () => {
  const { restaurants } = useAppSelector(state => state.restaurantsReducer);
  const [showCreatePage, setShowCreatePage] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<IRestaurant | null>(null);

  const { getAllRestaurants } = useActions();

  const handleShowCreatePage = (): void => {
    setSelectedRestaurant(null);
    setShowCreatePage(!showCreatePage);
  };

  const handleEditPage = (): void => {
    setSelectedRestaurant(null);
    setShowCreatePage(!showCreatePage);
  };

  const handleEdit = (data: IRestaurant): void => {
    setShowCreatePage(true);
    setSelectedRestaurant(data);
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <div>
      {showCreatePage ? (
        <CreateRestaurant
          showForm={handleEditPage}
          editData={selectedRestaurant}
        />
      ) : (
        <>
          <Button variant='outlined' onClick={handleShowCreatePage}>
            + Создать
          </Button>
          {restaurants?.map((el, index) => (
            <div key={index}>
              <RestaurantCard restaurant={el} edit={handleEdit} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Cafes;
