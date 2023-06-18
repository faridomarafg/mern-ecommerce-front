import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    filteredProducts: [],
    searchQuery: '',
};


const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
      FILTER_BY_SEARCH:(state, action)=>{
        const {products, search} = action.payload;//these values [products, search] come from [PorductList.jsx] component
        const tempProducts = products.filter((product)=> product.name.toLowerCase().includes(search.toLowerCase())
        || product.category.toLowerCase().includes(search.toLowerCase())
        );

        state.filteredProducts = tempProducts

      },
      setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;
        state.currentPage = 1; // Reset to first page when search query changes
      },
    } 
});

export const {
    FILTER_BY_SEARCH,
} = filterSlice.actions;

export const selectFilteredProduct = (state)=> state.filter.filteredProducts;

export default filterSlice.reducer;