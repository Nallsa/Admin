import { ChangeEvent, useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';

import { Input, Label } from './Form.elements';
import { MuiColorInput } from 'mui-color-input';
import { ICategoryProducts } from '../../../dto/products.dto';
import { Autocomplete } from '@mui/material';
import { useActions, useAppSelector } from '../../../hooks/useActions';

// import { ICategory } from 'dto/products.dto';

interface IProp {
  setCategoryProductState: Function;
  categoryProductState: any;
}

const EditFormCategory: React.FC<IProp> = ({
  categoryProductState,
  setCategoryProductState,
}) => {
  // const [editorState, setEditorState] = useState<any>()
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryProducts | null>(null);
  const { categoryProducts } = useAppSelector(state => state.productsReducer);
  const { getAllCategoryProducts } = useActions();

  const handleChangeMultiple = (event: any, value: any) => {
    setSelectedCategory(value);
    if (value) {
      setCategoryProductState((prev: ICategoryProducts) => ({
        ...prev,
        parentId: value.id,
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCategoryProductState((prev: ICategoryProducts) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getAllCategoryProducts();

    if (categoryProductState.parentId) {
      setSelectedCategory(
        categoryProducts.filter(el => el.id === categoryProductState.parentId)[0]
      );
    }
  }, [categoryProductState]);

  return (
    <div style={{ width: '100%' }}>
      <Input>
        <Label>Название</Label>
        <TextField
          name='title'
          id='title'
          value={categoryProductState?.title || ''}
          size='small'
          fullWidth
          multiline
          onChange={handleChange}
        />
      </Input>

      <Input>
        <Label>Родительская категория</Label>
        <Autocomplete
          size='small'
          id='category-outlined'
          options={categoryProducts}
          getOptionLabel={option => option.title!}
          filterSelectedOptions
          value={selectedCategory}
          onChange={handleChangeMultiple}
          renderInput={params => <TextField {...params} />}
        />
      </Input>

      <Input>
        <Label>Описание</Label>
        <TextField
          name='description'
          id='description'
          value={categoryProductState?.description || ''}
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
          value={categoryProductState?.color || ''}
          onChange={e =>
            setCategoryProductState({ ...categoryProductState, color: e })
          }
        />
      </Input>
    </div>
  );
};

export default EditFormCategory;
