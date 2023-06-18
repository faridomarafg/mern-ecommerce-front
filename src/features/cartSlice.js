import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialState = {
  //for getting produt-items from localStorage and add them to our application we do as bellow:
  cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity:0,//used for showing total added product in cart;
  cartTotalAmount:0,// used for showing subtotal of the prices
};


const cartSLice = createSlice({
    name:'cart',
    initialState,
    reducers:{
      addToCart(state, action){
        const itemIndex = state.cartItems.findIndex((item)=> item._id === action.payload._id);// if we already have item in the cart the [itemIndex]-equal to zero or a number greater than zero, else it will be-[-1]

        if(itemIndex >= 0){
            state.cartItems[itemIndex].cartQuantity +=1
            //toast.info(`${action.payload.name} increased in Caert`,{position:'top-center'})
            toast.info(`Increase ${state.cartItems[itemIndex].name} cart quantity`,{position:'top-center'})
        }else{
        //for add product to cart first we should define a tempProduct-variable, the idia is that we can also add the [cartQuantity]-property to our-product which is in the cart, and then use that[cartQuantity]-propety
        const tempProduct = {...action.payload, cartQuantity: 1}//[cartQuantity] default value is one 
        state.cartItems.push(tempProduct)
        toast.success(`${action.payload.name} added to Cart`,{position:'top-center'})
        }

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      },
      clearCart(state, action){
        state.cartItems = [];
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      },
      removeItemFromCart(state, action){
        const newCartItem = state.cartItems.filter((item)=> item._id !== action.payload._id);
        state.cartItems = newCartItem
        toast.info(`${action.payload.name} rmoved from Cart`,{position:'top-center'})
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      },
      decreaseCartItem(state, action){
         const itemIndex = state.cartItems.findIndex((item)=> item._id === action.payload._id);

         if(state.cartItems[itemIndex].cartQuantity > 1){
            state.cartItems[itemIndex].cartQuantity -= 1;
            toast.info(`${action.payload.name} Decreased by one`,{position:'top-center'})
         }else if(state.cartItems[itemIndex].cartQuantity === 1){
            const newCartItem = state.cartItems.filter((item)=> item._id !== action.payload._id);
            state.cartItems = newCartItem;
            toast.info(`${action.payload.name} rmoved from Cart`,{position:'top-center'})
         }
         localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      },

    CALCULATE_SUBTOTAL:(state,action)=>{
        const array = [];

        state.cartItems.map((item)=>{
           //now destructure the following properties from item;
           const {price, cartQuantity} = item;
           //now for getting the total amount of price an item in cart do the bellow line:
           const cartItemAmount = price * cartQuantity;
           //now push the [cartItemAmount] into the array;
           return array.push(cartItemAmount);
        });

        //now we have array with all price of each item/product, we can use the reduce method to sum all these price together;
        const totalAmount = array.reduce((a,b)=> {//it sum all the value in array together;
           return a + b
        },0);//we add this [0], because reduce-method has initial-value and we set [0] as initial value, otherwise it would case error when you clear the the cart, and it ask you for initial-value of reduce-method;
       
        state.cartTotalAmount = totalAmount;
     },
      CALCULATE_TOTAL_QUANTITY:(state, action)=>{
        const array = [];

        state.cartItems.map((item)=>{
           const { cartQuantity} = item;
          
           const quantity = cartQuantity;
           return array.push(quantity);
        });
        const totalQuantity = array.reduce((a,b)=> {
           return a + b
        },0);
       
        state.cartTotalQuantity = totalQuantity; 
      }, 
    }
});

export const {
    addToCart, 
    clearCart, 
    removeItemFromCart, 
    decreaseCartItem,
    CALCULATE_TOTAL_QUANTITY,
    CALCULATE_SUBTOTAL
} = cartSLice.actions;

export default cartSLice.reducer;