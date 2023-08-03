import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

import EditCard from '../../../components/editProduct/editCard';
import EditForm from '../../../components/editProduct/editForm';
import EditMeta from '../../../components/editProduct/editMeta';
import EditOptions from '../../../components/editProduct/editOptions';
import { IProduct } from '../../../dto/products.dto';
import { useActions } from '../../../hooks/useActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateProducts: React.FC = () => {
  const location = useLocation();
  const state = location?.state as any;
  const product = state?.product as any | null;
  const navigate = useNavigate();
  const { createProduct, editProductById, getAllProducts } = useActions();
  // const { restaurants } = useAppSelector(state => state.restaurantsReducer);

  const initialState: IProduct = {
    title: '',
    description: null,
    weight: null,
    kkal: null,
    proteins: null,
    fats: null,
    carbohydrates: null,
    size: null,
    color: null,
    article: null,
    isSale: true,
    isDelivery: true,
    smallImage: '',
    image: '',
    metaTitle: null,
    metaDescription: null,
    metaKeywords: null,
    metaRobots: null,
    price: null,
    categoryProductsId: null,
    measurementUnitId: null,
    isHidden: false,
    isActive: true,
    restaurantPrice: null,
  };

  const [productState, setProductState] = useState<IProduct>(initialState);

  useEffect(() => {
    getAllProducts();
    if (product) {
      for (let [key, value] of Object.entries(product)) {
        setProductState((prev: IProduct) => ({
          ...prev,
          [key]: value,
        }));
      }
    }
  }, []);

  const handleSetFile = (name: string, value: any): void => {
    setProductState((prev: IProduct) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // toast.error('dada');
    if (productState.id) {
      (async () => {
        const response = await editProductById(productState);
        if (response.payload) {
          return navigate('../products');
        }
      })();
      return;
    } else {
      (async () => {
        delete productState.id;
        const response = await createProduct(productState);
        if (response.payload) {
          return navigate('../products');
        }
      })();
      return;
    }
  };

  const handleCancel = (): void => {
    setProductState(initialState);
    navigate('../products');
  };

  const buttonSection = (): React.ReactElement => {
    return (
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button
          size='small'
          variant='outlined'
          startIcon={<DoDisturbOnIcon />}
          onClick={handleCancel}
          color='error'
        >
          Отмена
        </Button>
        <div
          onClick={() => {
            !productState.title && toast.error(`Название товара не заполнено`);
            !productState.price && toast.error(`Цена товара не заполнено`);
            !productState.description &&
              toast.error(`Описание товара не заполнено`);
            !productState.color && toast.error(`Цвет не заполнен`);
            !productState.measurementUnitId &&
              toast.error(`Единица товара не выбран`);
            !productState.size && toast.error(`Размер товара не заполнен`);
            !productState.article && toast.error(`Артикул не заполнен`);
          }}
        >
          <Button
            size='small'
            variant='outlined'
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={
              !productState.title ||
              !productState.price ||
              !productState.description ||
              !productState.color ||
              !productState.measurementUnitId ||
              !productState.article ||
              !productState.size
            }
          >
            Сохранить
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <EditCard title='Информация' option={buttonSection()}>
            <EditForm
              setProductState={setProductState}
              productState={productState}
            />
          </EditCard>
          {/* {restaurants.length > 0 ? (
            <EditCard title='Цена товара в ресторане' style={{ marginTop: 20 }}>
              <EditPrice setProductState={setProductState} productState={productState} />
            </EditCard>
          ) : (
            <></>
          )} */}
        </Grid>
        <Grid item xs={12} md={4}>
          <EditCard title='Детали'>
            <div>
              <EditOptions
                active={productState.isActive}
                setActive={setProductState}
                type='isActive'
              />
              <EditOptions
                active={productState.isDelivery}
                setActive={setProductState}
                type='isDelivery'
              />
              <EditOptions
                active={productState.isSale}
                setActive={setProductState}
                type='isSale'
              />
              {/* <Row>
                <FileInput
                  title='Маленькое изображение'
                  name='smallImage'
                  setFile={handleSetFile}
                  file={productState?.smallImage}
                />

                <FileInput
                  title='Большое изображение'
                  setFile={handleSetFile}
                  name='image'
                  file={productState?.image}
                />
              </Row> */}
            </div>
          </EditCard>
          <EditCard title='Мета данные' style={{ marginTop: 20 }}>
            <EditMeta setState={setProductState} state={productState} />
          </EditCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateProducts;
