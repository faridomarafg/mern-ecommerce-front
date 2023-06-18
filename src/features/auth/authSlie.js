import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './authService';
import {toast} from 'react-toastify';


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,  
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Loing user
export const loginuser = createAsyncThunk('auth/login' ,async (userData, thunkAPI)=>{
    try {
        const response = await api.login(userData);
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

// Register user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI)=>{
  try {
    const response = await api.register(userData);
    return response.data
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

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
      setUser:(state, action)=>{
         state.user = action.payload
      },
      setLoguout:(state, action)=>{
        localStorage.clear();
        state.user = null
      },
      reset:(state)=>{
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.user = null
      }
    },
    extraReducers:(builder)=>{
    builder

    //Login-user
    .addCase(loginuser.pending, (state)=>{
      state.isLoading = true
    })
    .addCase(loginuser.fulfilled, (state, action)=>{
      state.isLoading = false
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.isSuccess = true
      state.user = action.payload
      toast.success('Login successfull',{position:'top-center'});
    })
    .addCase(loginuser.rejected, (state, action)=>{
      state.isLoading = false
      state.isError = true
      state.user = null
      state.message = action.payload
      toast.error(action.payload,{position:'top-center'});
    })

    //Register-user
    .addCase(register.pending, (state)=>{
    state.isLoading = true
    })
    .addCase(register.fulfilled, (state, action)=>{
    state.isLoading = false
    localStorage.setItem("user", JSON.stringify({ ...action.payload }));
    state.isSuccess = true
    state.user = action.payload
    toast.success('User register successfully',{position:'top-center'});
    })
    .addCase(register.rejected, (state, action)=>{
    state.isLoading = false
    state.isError = true
    state.user = null
    state.message = action.payload
    toast.error(action.payload,{position:'top-center'});
    })
    }
});

export const {setUser, setLoguout,reset} = authSlice.actions

export default authSlice.reducer;