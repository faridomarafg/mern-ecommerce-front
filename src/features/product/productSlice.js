import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './porductService';
import {toast} from 'react-toastify';


const initialState = {
    products:[],
    product:{},
    isLoading:false,
    isSuccess: false,
    isError: false,
    message:''
};

//Get all products
export const getAllProducts = createAsyncThunk('products/getAllProducts',async (_, thunkAPI)=>{
   try {
    const response = await api.getProducts()
    return response?.data;
   } catch (error) {
    const message =
    (error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message); 
   }
});

//Get single product
export const getSingleProduct = createAsyncThunk('products/getSingleProduct',async (id, thunkAPI)=>{
  try {
   const response = await api.getProduct(id)
   return response?.data;
  } catch (error) {
   const message =
   (error.response &&
   error.response.data &&
   error.response.data.message) ||
   error.message ||
   error.toString()
   return thunkAPI.rejectWithValue(message); 
  }
});


//Create product
export const createProduct = createAsyncThunk('products/createProduct',async (productData, thunkAPI)=>{
  try {
   const response = await api.createProduct(productData)
   return response.data;
  } catch (error) {
    const message =
    (error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message);  
  }
});

//DELETE PRODUCT
export const deleteProduct = createAsyncThunk('products/deleteProduct',async (id, thunkAPI)=>{
  try {
   const response = await api.deleteProduct(id)
   return response.data;
  } catch (error) {
    const message =
    (error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message);  
  }
});


//UPDATE PRODUCT
export const updateProduct = createAsyncThunk('products/updateProduct',async ({productData,id}, thunkAPI)=>{
  try {
   const response = await api.updateProduct(id,productData)
   return response.data;
  } catch (error) {
    const message =
    (error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message);  
  }
});


const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
      reset: (state) => initialState,
    },
    extraReducers:(builder)=>{
     builder
    
    //Get all Products 
    .addCase(getAllProducts.pending, (state)=>{
      state.isLoading = true 
    })
    .addCase(getAllProducts.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.products = action.payload;
    })
    .addCase(getAllProducts.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true
    state.message = action.payload;
    })


    //Get Single Product 
    .addCase(getSingleProduct.pending, (state)=>{
      state.isLoading = true
      console.log(state.isLoading); 
    })
    .addCase(getSingleProduct.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.product = action.payload;
    })
    .addCase(getSingleProduct.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true
    state.message = action.payload;
    console.log(action.payload);
    })

    //Create Product
    .addCase(createProduct.pending, (state)=>{
      state.isLoading = true 
    })
    .addCase(createProduct.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    })
    .addCase(createProduct.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true
    state.message = action.payload;
    })

    //Delete Product
    .addCase(deleteProduct.pending, (state)=>{
      state.isLoading = true 
    })
    .addCase(deleteProduct.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.products = state.products.filter((item)=> item._id !== action.payload._id);
    toast.success('Product deleted successfully!', {position: 'top-center'});
    })
    .addCase(deleteProduct.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true
    state.message = action.payload;
    })

    //Update Product
    .addCase(updateProduct.pending, (state)=>{
      state.isLoading = true 
    })
    .addCase(updateProduct.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.products = state.products.filter((item)=> item._id === action.payload._id);
    toast.success('Product updated successfully!', {position: 'top-center'});
    })
    .addCase(updateProduct.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true
    state.message = action.payload;
    })
    }
});

export const {reset} = productSlice.actions;

export default  productSlice.reducer;