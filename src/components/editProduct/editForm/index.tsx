import ScaleIcon from '@mui/icons-material/Scale';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { ChangeEvent, lazy, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import { Input, InputRow, Label, Options } from './Form.elements';
import { IProduct, ICategoryProducts } from '../../../dto/products.dto';
import { useActions, useAppSelector } from '../../../hooks/useActions';
import { Container } from '@mui/material';
import MeasureList from '../measureList';
import { MuiColorInput } from 'mui-color-input';
import { IMeasureUnit } from '../../../dto/elements.dto';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface IProp {
  setProductState: Function;
  productState: IProduct;
}

const EditForm: React.FC<IProp> = ({ productState, setProductState }) => {
  const { getAllCategoryProducts } = useActions();
  const { categoryProducts } = useAppSelector(state => state.productsReducer);
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryProducts | null>(null);
  const [selectedMeasureUnit, setSelectedMeasureUnit] =
    useState<IMeasureUnit | null>(null);
  const navigate = useNavigate();

  const handleChangeMultiple = (event: any, value: any) => {
    setSelectedCategory(value);
    if (value) {
      setProductState((prev: IProduct) => ({
        ...prev,
        categoryProductsId: value.id,
      }));
    }
  };

  const handleChange = (e: any): void => {
    setProductState((prev: IProduct) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (categoryProducts.length === 0) {
      getAllCategoryProducts();
    }

    if (productState.categoryProductsId) {
      setSelectedCategory(
        categoryProducts.filter(
          el => el.id === productState.categoryProductsId
        )[0]
      );
    }
  }, [productState]);

  return (
    <Container>
      <InputRow>
        <Input>
          <Label>Название товара</Label>
          <TextField
            name='title'
            id='name'
            value={productState?.title || ''}
            size='small'
            fullWidth
            onChange={handleChange}
          />
        </Input>
      </InputRow>
      <InputRow>
        <Input
          onClick={() => {
            if (categoryProducts.length == 0) {
              toast.error(`Создайте категорию`);
              setTimeout(() => {
                return navigate('../products/create_categoryProducts');
              }, 2000);
            }
          }}
        >
          <Label>Категория</Label>
          <Autocomplete
            size='small'
            id='category-outlined'
            options={categoryProducts}
            disabled={categoryProducts.length === 0}
            getOptionLabel={option => String(option.title)}
            filterSelectedOptions
            value={selectedCategory}
            onChange={handleChangeMultiple}
            renderInput={params => {
              return <TextField {...params} />;
            }}
          />
        </Input>

        <Input style={{ width: '37.5%' }}>
          <Label>Артикул</Label>
          <TextField
            name='article'
            id='article'
            value={productState?.article || ''}
            size='small'
            fullWidth
            onChange={handleChange}
          />
        </Input>
      </InputRow>
      <InputRow>
        <Input style={{ width: '80%' }}>
          <Label>Цена товара</Label>
          <div
            onClick={() =>
              !selectedMeasureUnit
                ? toast.error('Выберити единицу измерения')
                : null
            }
          >
            <TextField
              name='price'
              id='price'
              label={`Цена товара ${
                selectedMeasureUnit?.title
                  ? 'за ' + selectedMeasureUnit?.title
                  : ''
              }`}
              disabled={!selectedMeasureUnit ? true : false}
              value={productState?.price || ''}
              size='small'
              fullWidth
              onChange={handleChange}
            />
          </div>
        </Input>{' '}
        <MeasureList
          selectedMeasureUnit={selectedMeasureUnit}
          setSelectedMeasureUnit={setSelectedMeasureUnit}
          productState={productState}
          setProductState={setProductState}
        />
      </InputRow>
      <Label>Размер товара</Label>
      <Options>
        <TextField
          id='s-input-with-icon-textfield'
          size='small'
          label=''
          disabled
          sx={{ width: '90px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {selectedMeasureUnit?.title}
              </InputAdornment>
            ),
          }}
        />
        <div
          onClick={() =>
            !selectedMeasureUnit
              ? toast.error('Выберити единицу измерения')
              : null
          }
        >
          <TextField
            size='small'
            label='Размер товара'
            name='size'
            disabled={!selectedMeasureUnit ? true : false}
            value={productState?.size}
            id='size'
            onChange={handleChange}
          />
        </div>
      </Options>
      <Label>Доп. инфа</Label>
      <Options>
        <TextField
          id='s-input-with-icon-textfield'
          size='small'
          label=''
          disabled
          sx={{ width: '90px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>ккал</InputAdornment>
            ),
          }}
        />
        <TextField
          size='small'
          label='Калорийность товара'
          name='kkal'
          value={productState?.kkal}
          id='weight'
          onChange={handleChange}
        />
      </Options>
      <Options>
        <TextField
          id='s-input-with-icon-textfield'
          size='small'
          label=''
          disabled
          sx={{ width: '90px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>гр</InputAdornment>
            ),
          }}
        />
        <TextField
          size='small'
          label='Белки'
          name='proteins'
          value={productState?.proteins}
          id='weight'
          onChange={handleChange}
        />
      </Options>
      <Options>
        <TextField
          id='s-input-with-icon-textfield'
          size='small'
          label=''
          disabled
          sx={{ width: '90px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>гр</InputAdornment>
            ),
          }}
        />
        <TextField
          size='small'
          label='Жиры'
          name='fats'
          value={productState?.fats}
          id='weight'
          onChange={handleChange}
        />
      </Options>
      <Options>
        <TextField
          id='s-input-with-icon-textfield'
          size='small'
          label=''
          disabled
          sx={{ width: '90px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>гр</InputAdornment>
            ),
          }}
        />
        <TextField
          size='small'
          label='Углеводы'
          name='carbohydrates'
          value={productState?.carbohydrates}
          // id='weight'
          onChange={handleChange}
        />
      </Options>
      <Options>
        <TextField
          id='s-input-with-icon-textfield'
          size='small'
          label=''
          disabled
          sx={{ width: '90px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>кг</InputAdornment>
            ),
          }}
        />
        <TextField
          size='small'
          label='Вес товара'
          name='weight'
          value={productState?.weight}
          onChange={handleChange}
        />
      </Options>
      <Input>
        <Label>Описание товара</Label>
        {/* <Editor setState={handleChangeText} state={productState.description} /> */}
        <TextField
          name='description'
          id='description'
          value={productState?.description || ''}
          size='small'
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
      </Input>
      <Input>
        <Label>Цвет</Label>

        <MuiColorInput
          name='color'
          id='color'
          size='small'
          value={productState?.color || ''}
          onChange={e => setProductState({ ...productState, color: e })}
        />
      </Input>
    </Container>
  );
};

export default EditForm;
