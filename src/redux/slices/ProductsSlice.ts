import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategoryProducts, IProduct, IProductsState } from '../../dto/products.dto';
import ProductsService from '../services/products.service';
import { toast } from 'react-toastify';

//==============CategoryProducts==========================
const getAllCategoryProducts = createAsyncThunk(
  //action type string
  'CategoryProducts/getAllCategoryProducts',
  // callback function
  async thunkAPI => {
    try {
      const response = await ProductsService.getAllCategoryProducts();
      return response.data;
    } catch (error: any) {
      toast.error(`${error?.status}`);
      if (error?.data?.message) {
        console.log({ error });
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const getCategoryProductsById = createAsyncThunk(
  //action type string
  'categoryProducts/getCategoryProductById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await ProductsService.getCategoryProductsById(id);
      return response.data;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const createCategoryProducts = createAsyncThunk(
  //action type string
  'categoryProducts/createlCategoryProduct',
  // callback function
  async (data: ICategoryProducts, thunkAPI) => {
    try {
      const response = await ProductsService.createCategoryProducts(data);

      toast.success(`Категория создана`);
      return response.data;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const editCategoryProductsById = createAsyncThunk(
  //action type string
  'categoryProducts/editCategoryProductsById',
  // callback function
  async (data: ICategoryProducts, thunkAPI) => {
    try {
      const response = await ProductsService.editCategoryProductsById(data);
      toast.success(`Категория успешно отредактирована`);
      return response.data;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);
const deleteCategoryProductsById = createAsyncThunk(
  //action type string
  'categoryProducts/deleteCategoryProductById',
  // callback function
  async (id: string, thunkAPI) => {
    try {
      const response = await ProductsService.deleteCategoryProductsById(id);
      toast.success(`Категория успешно удалена`);
      return response.data.id;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

// ================Products===================================
const getAllProducts = createAsyncThunk(
  //action type string
  'Products/getAllProducts',
  // callback function
  async thunkAPI => {
    try {
      const response = await ProductsService.getAllProducts();
      return response.data;
    } catch (error: any) {
      toast.error(`${error?.status}`);
      if (error?.data?.message) {
        console.log({ error });
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const createProduct = createAsyncThunk(
  //action type string
  'Products/createProduct',
  // callback function
  async (data: ICategoryProducts, thunkAPI) => {
    try {
      const response = await ProductsService.createProduct(data);
      toast.success(`Товар успешно создан`);
      return response.data;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const getProductById = createAsyncThunk(
  //action type string
  'Products/getProductById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await ProductsService.getProductById(id);
      return response.data;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const editProductById = createAsyncThunk(
  //action type string
  'Products/editProductById',
  // callback function
  async (data: ICategoryProducts, thunkAPI) => {
    try {
      const response = await ProductsService.editProductById(data);
      toast.success(`Товар успешно отредактирован`);
      return response.data;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const deleteProductById = createAsyncThunk(
  //action type string
  'Products/deleteProductById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await ProductsService.deleteProductById(id);
      toast.success(`Товар успешно удален`);
      return response.data.id;
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error(`${error?.statusText}`);
      }
    }
  }
);

const initialState: IProductsState = {
  products: [],
  categoryProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //==============CategoryProducts==========================
    builder.addCase(getAllCategoryProducts.fulfilled, (state, action) => {
      if (action.payload) state.categoryProducts = action.payload;
    });
    builder.addCase(createCategoryProducts.fulfilled, (state, action) => {
      if (action.payload) state.categoryProducts.push(action.payload);
    });
    builder.addCase(editCategoryProductsById.fulfilled, (state, action) => {
      if (action.payload)
        state.categoryProducts = state.categoryProducts.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as ICategoryProducts[];
    });
    builder.addCase(deleteCategoryProductsById.fulfilled, (state, action) => {
      if (action.payload)
        state.categoryProducts = state.categoryProducts.filter(
          el => el.id !== action.payload
        );
    });
    // ================Products===================================
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      if (action.payload) state.products = action.payload;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.products.push(action.payload);
      }
    });
    builder.addCase(editProductById.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = state.products.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IProduct[];
      }
    });
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      console.log(action.payload);

      if (action.payload)
        state.products = state.products.filter(el => el.id !== action.payload);
    });
  },
});

export const productsActions: any = {
  ...productsSlice.actions,
  getAllCategoryProducts,
  createCategoryProducts,
  editCategoryProductsById,
  deleteCategoryProductsById,
  getAllProducts,
  createProduct,
  editProductById,
  deleteProductById,
};

export const productsReducer = productsSlice.reducer;
