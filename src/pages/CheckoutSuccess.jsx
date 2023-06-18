import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';


function CheckoutSuccess() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(clearCart());
  },[dispatch]);

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-sky-600 text-white'>
        <h1 className='text-2xl sm:text-4xl md:text-6xl'>Checkout Successful</h1>
        <p>Thanks for your purchase at E-shop</p>
        
          <button className='bg-amber-400 px-3 py-1 rounded-lg my-3 md:text-xl'>
            <Link to='/user-orders'>View order status</Link>
          </button>
        
    </div>
  )
}

export default CheckoutSuccess