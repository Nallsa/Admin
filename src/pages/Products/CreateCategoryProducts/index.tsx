import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import EditFormCategory from '../../../components/category/editFormCategory';
import EditCard from '../../../components/editProduct/editCard/index';
import EditMeta from '../../../components/editProduct/editMeta/index';
import FileInput from '../../../components/editProduct/fileInput/index';
import { ICategoryProducts } from '../../../dto/products.dto';
import { useActions } from '../../../hooks/useActions';
import { settings } from '../../../ThemeStyle';

const CreateCategory: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location?.state as any;
  const categoryProducts = state?.categoryProducts as any | null;
  const { createCategoryProducts, editCategoryProductsById } = useActions();
  const [categoryState, setCategoryState] = useState<ICategoryProducts>({
    title: '',
    parentId: '',
    description: '',
    image: '',
    color: '',
    metaTitle: null,
    metaDescription: null,
    metaKeywords: null,
    metaRobots: null,
  });

  useEffect(() => {
    if (categoryProducts) {
      for (let [key, value] of Object.entries(categoryProducts)) {
        setCategoryState((prev: any) => ({ ...prev, [key]: value }));
      }
    }
  }, [categoryProducts]);

  const handleSave = () => {
    if (categoryState.id) {
      (async () => {
        const response = await editCategoryProductsById(categoryState);
        if (response.payload) {
          return navigate('../products');
        }
      })();
      return;
    } else {
      (async () => {
        delete categoryState.id;
        const response = await createCategoryProducts(categoryState);
        if (response.payload) {
          return navigate('../products');
        }
      })();
      return;
    }
  };

  const handleSetFile = (name: string, value: any | null): void => {
    setCategoryState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCancel = (): void => {
    setCategoryState({
      title: '',
      description: null,
      image: '',
      color: null,
      metaTitle: null,
      metaDescription: null,
      metaKeywords: null,
      metaRobots: null,
    });
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
        <Button
          size='small'
          variant='outlined'
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Сохранить
        </Button>
      </div>
    );
  };

  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid item xs={12} md={7}>
        <EditCard title='Информация' option={buttonSection()}>
          <EditFormCategory
            categoryProductState={categoryState}
            setCategoryProductState={setCategoryState}
          />
        </EditCard>
      </Grid>
      <Grid item xs={12} md={7} sx={{ maxHeight: `${settings.wrapper}vh` }}>
        {/* <EditCard title='Детали'>
            <FileInput
              file={categoryState?.image}
              setFile={handleSetFile}
              title='Изображение'
              name='image'
            />
          </EditCard> */}

        <EditCard title='Мета данные' style={{ marginTop: 20 }}>
          <EditMeta setState={setCategoryState} state={categoryState} />
        </EditCard>
      </Grid>
    </Grid>
  );
};

export default CreateCategory;
