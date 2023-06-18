import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './categoryService';
import {toast} from 'react-toastify';


const initialState = {
  categories: [],
  category:{},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message:'' 
};

//GET ALL CATEGORIES
export const getCategories = createAsyncThunk('category/getCategories', async(_, thunkAPI)=>{
    try {
        const responce = await api.getCategories();
        return responce.data
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

//CREATE CATEGORY
export const createCategory = createAsyncThunk('category/createCategory', async(categoryData, thunkAPI)=>{
    try {
        const responce = await api.createCategory(categoryData);
        return responce.data
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

//DELETE CATEGORY
export const deleteCategory = createAsyncThunk('category/deleteCategory', async(id, thunkAPI)=>{
    try {
        const responce = await api.deleteCategory(id);
        return responce.data
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

//UPDATE CATEGORY
export const updateCategory = createAsyncThunk('category/updateCategory', async({id,categoryData}, thunkAPI)=>{
    try {
        const responce = await api.updateCategory(id,categoryData);
        return responce.data
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


const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{
      RESET_CATEGORY: (state)=> initialState
    },
    extraReducers:(builder)=>{
    builder
      
    //Get all Categories
    .addCase(getCategories.pending, (state)=>{
      state.isLoading = true
    })
    .addCase(getCategories.fulfilled, (state,action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload  
    })
    .addCase(getCategories.rejected, (state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload  
    })

    //Create category
    .addCase(createCategory.pending, (state)=>{
    state.isLoading = true
    })
    .addCase(createCategory.fulfilled, (state,action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    toast.success('Category created successfully!', {position: 'top-center'});
    state.categories = [action.payload]  
    })
    .addCase(createCategory.rejected, (state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload  
    })

    //Create category
    .addCase(deleteCategory.pending, (state)=>{
    state.isLoading = true
    })
    .addCase(deleteCategory.fulfilled, (state,action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    toast.info('Category deleted successfully!', {position: 'top-center'});
    state.categories = state.categories.filter((item)=> item._id !== action.payload._id)  
    })
    .addCase(deleteCategory.rejected, (state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload  
    })

    //Update category
    .addCase(updateCategory.pending, (state)=>{
    state.isLoading = true
    })
    .addCase(updateCategory.fulfilled, (state,action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.categories = state.categories.filter((item)=> item._id === action.payload._id);
    toast.info('Category updated successfully!', {position: 'top-center'});
    })
    .addCase(updateCategory.rejected, (state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload  
    }) 
    }
});

export const {RESET_CATEGORY} = categorySlice.actions;

export default  categorySlice.reducer;