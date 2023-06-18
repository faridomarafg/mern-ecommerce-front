import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './orderService';
import {toast} from 'react-toastify';


const initialState = {
  orders:[],
  userOrders:[],
  order: {},
  isLoading:false,
  isSuccess: false,
  isError: false,
  message: ''
};



//Get all orders
export const getAllOrders = createAsyncThunk('order/getAllOrders', async(_, thunkAPI)=>{
   try {
    const res = await api.getAllOrders();
    return res.data
   } catch (error) {
    const message =
    (error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message)   
   }
});

//Get order by ID
export const getOrderByID = createAsyncThunk('order/getOrderByID', async(id, thunkAPI)=>{
    try {
     const res = await api.getOrderByID(id);
     return res.data
    } catch (error) {
     const message =
     (error.response &&
     error.response.data &&
     error.response.data.message) ||
     error.message ||
     error.toString()
     return thunkAPI.rejectWithValue(message)   
    }
 });


 //Get order by User-Id
 export const getOrderByUserID = createAsyncThunk('order/getOrderByUserID', async(id, thunkAPI)=>{
   try {
       const response = await api.getOrderByUserID(id);
       return response.data
   } catch (error) {
       const message =
       (error.response &&
       error.response.data &&
       error.response.data.message) ||
       error.message ||
       error.toString()
       return thunkAPI.rejectWithValue(message)     
   }
});



 //Delete order
export const deleteOrder = createAsyncThunk('order/deleteOrder', async(id, thunkAPI)=>{
   try {
    const res = await api.deleteOrder(id);
    return res.data
   } catch (error) {
    const message =
    (error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message)   
   }
});

 //Update order
 export const updateOrder = createAsyncThunk('order/updateOrder', async({id, orderData}, thunkAPI)=>{
   try {
    const res = await api.updateOrder(id,orderData);
    return res.data
   } catch (error) {
    const message =
    (error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message)   
   }
});

const orderSlice = createSlice({
   name:'order',
   initialState,
   reducers:{

   },
   extraReducers:(builder)=>{
    builder

    //Get all orders
    .addCase(getAllOrders.pending, (state)=>{
      state.isLoading = false  
    })
    .addCase(getAllOrders.fulfilled, (state, action)=>{
    state.isLoading = false 
    state.isSuccess = true
    state.orders = action.payload 
    })
    .addCase(getAllOrders.rejected, (state, action)=>{
    state.isLoading = false
    state.isError = true
    state.message = action.payload  
    })

    //Get order by id
    .addCase(getOrderByID.pending, (state)=>{
    state.isLoading = false  
    })
    .addCase(getOrderByID.fulfilled, (state, action)=>{
    state.isLoading = false 
    state.isSuccess = true
    state.order = action.payload 
    })
    .addCase(getOrderByID.rejected, (state, action)=>{
    state.isLoading = false
    state.isError = true
    state.message = action.payload  
    })

   //Get order by User-Id
   .addCase(getOrderByUserID.pending, (state)=>{
   state.isLoading = false  
   })
   .addCase(getOrderByUserID.fulfilled, (state, action)=>{
   state.isLoading = false 
   state.isSuccess = true
   state.userOrders = action.payload 
   })
   .addCase(getOrderByUserID.rejected, (state, action)=>{
   state.isLoading = false
   state.isError = true
   state.message = action.payload  
   }) 

   //Delete order
   .addCase(deleteOrder.pending, (state)=>{
   state.isLoading = false  
   })
   .addCase(deleteOrder.fulfilled, (state, action)=>{
   state.isLoading = false 
   state.isSuccess = true
   state.orders = state.orders.filter((item)=> item._id !== action.payload._id);
   toast.success('Order deleted successfully!', {position:'top-center'}) 
   })
   .addCase(deleteOrder.rejected, (state, action)=>{
   state.isLoading = false
   state.isError = true
   state.message = action.payload  
   })

   //Delete order
   .addCase(updateOrder.pending, (state)=>{
   state.isLoading = false  
   })
   .addCase(updateOrder.fulfilled, (state, action)=>{
   state.isLoading = false 
   state.isSuccess = true
   state.orders = state.orders.filter((item)=> item._id === action.payload._id);
   toast.success('Order Updated successfully!', {position:'top-center'}) 
   })
   .addCase(updateOrder.rejected, (state, action)=>{
   state.isLoading = false
   state.isError = true
   state.message = action.payload  
   })
   }
});


export default orderSlice.reducer;