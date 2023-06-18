import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom';
import { getOrderByID, updateOrder } from '../../../features/order/orderSlice';

function OrderDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeBtn, setActiveBtn] = useState(false);
    const [delivery_status, setDelivery_status] = useState('');

    const btnStatusHandler = ()=>{
      setActiveBtn(!activeBtn);
    }

    const {id} = useParams();

    const {order} = useSelector((state)=> state.order);
    const {user} = useSelector((state)=> state.auth);

    const isAdmin = user?.user?.isAdmin;

    const {products,shipping} = order

    useEffect(()=>{
        dispatch(getOrderByID(id))
    },[dispatch, id]);

    const onSubmitHandler = (e)=>{
      e.preventDefault();
      const orderData = {
        delivery_status
      }
      dispatch(updateOrder({id,orderData}))
      navigate('/admin/orders')
    };

  return (
     <div className="flex flex-col w-full h-screen bg-slate-50 items-center justify-center p-5 rounded-lg shadow-lg">
      <div className="flex flex-col w-full ss:w-[80%] h-fit bg-slate-100  p-5 rounded-lg shadow-lg">
      <h1 className='w-full text-center text-3xl font-bold text-teal-600 font-playfair'>Order Details</h1>
      <div className="flex flex-col justify-start">
        {/* ORDER DETAILS  */}
        <div className='flex flex-col text-[10px] ss:text-[15px] bg-slate-300 rounded-lg p-4'>
          {/* delivery status section */}
          <div className="flex w-full justify-between ">
             <div className='flex w-full'>
                <h1 className=' font-bold text-slate-500'>Delivery Status :</h1>&nbsp;
                <span
                className={`font-semibold ${
                  order.delivery_status === 'Pending'
                  ? 'text-slate-500'
                  : order.delivery_status === 'Processing'
                  ? 'text-orange-400'
                  : order.delivery_status === 'Deliveried'
                  ? 'text-green-600'
                  : ''
                }`}
                >
                  &nbsp;{order.delivery_status}
                </span>
             </div>
            {/* ORDER STATUS UPDATE SECTION */}
             {isAdmin && <form onSubmit={onSubmitHandler} className='flex w-full justify-start gap-2'>
                  <select 
                  onClick={btnStatusHandler} 
                  value={delivery_status}
                  onChange={(e)=> setDelivery_status(e.target.value)}
                  className={activeBtn ? 'w-[100%]' : 'w-[50%]'}
                  >
                  <option ></option>
                  <option ></option>
                  <option >Processing</option>
                  <option >On the way</option>
                  <option >Deliveried</option>
                  </select>
                  <button type='submit' className='flex w-full text-center bg-blue-600 pl-9 text-white'>
                    Update Status
                  </button>
                </form>}
          </div>
          {/* Product details */}
          <div>
            {products?.map((item, index) => {
              return(
                <div key={index} className='flex gap-4'>
                  <div className='flex'>
                    <h1 className='font-bold text-slate-500'>Product :</h1>
                    <h1 className='text-teal-600 '>{item?.description}</h1>
                  </div>
                  <div className='flex'>
                      <h1 className='font-bold text-slate-500'>Price :</h1>&nbsp;
                      <h1 className='text-amber-500 '>${item.price.unit_amount}</h1>
                  </div>
                </div>
              )
            })}
          </div>
          {/* subtotal amount */}
          <div className='flex  font-bold text-slate-500 gap-2 items-center'>
            <h1>Subtotal :</h1>
            <span className='text-green-600 text-xl font-mono'>${order.subtotal}</span>
          </div>
          {/* Order ID */}
          <div className='flex bg-white w-full py-1 px-2 text-[10px] ss:text-[17px] text-neutral-600 font-bold'>
            <p>Order ID :&nbsp;</p>
            <span>{order?._id}</span>
          </div>
        </div>
        {/* CUSTOMER DETAILS */}
        <div className='flex flex-col w-full bg-blue-500 text-[10px] ss:text-[15px] text-white p-4 rounded-lg mt-2'>
           <h1 className='flex w-full justify-center text-2xl text-amber-400 font-bold font-playfair'>Customer Details</h1> 
           <div className='flex'>
             <h1>Cutomer Name :</h1>
             <b>{shipping?.name}</b>
           </div>
           <div className='flex'>
             <h1>Cutomer Email :</h1>
             <b>{shipping?.email}</b>
           </div>
           <div className='flex'>
             <h1>Cutomer Phone :</h1>
             <b>{shipping?.phone}</b>
           </div>
        </div>
      </div>
    </div>
     </div>
  );
}

export default OrderDetails