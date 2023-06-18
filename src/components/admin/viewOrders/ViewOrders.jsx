import React, { useEffect } from 'react';
import {AiFillCloseCircle,AiFillEdit, AiFillEye} from 'react-icons/ai';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, getAllOrders } from '../../../features/order/orderSlice';
import moment from 'moment';


function ViewOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {orders} = useSelector((state)=> state.order);

  console.log(orders);

  useEffect(()=>{
    dispatch(getAllOrders())
  },[dispatch]);


  const deleteHandler = (id)=>{
     dispatch(deleteOrder(id));
     navigate('/admin/orders')
  };

  return (
    <div className='flex flex-col'>
      <h1 className='flex w-full text-3xl p-4 font-bold text-slate-500'>All orders</h1>
      <table>
         <thead className='fle w-full border-b-2 border-b-slate-500'>
            <tr className='flex w-full text-sm'>
            
              <th className='flex w-[13%] justify-center border'>Name</th>
              <th className='flex w-[13%] justify-center border'>Date</th>
              <th className='flex w-[12%] justify-center border'>Order Amount</th>
              <th className='flex w-[12%] justify-center border'>Order Status</th>
              <th className='flex w-[12%] justify-center border'>Payment Status</th>
              <th className='flex w-[22%] justify-center border'>Order ID</th>
              <th className='flex w-[16%] justify-center border'>Actions</th>
            </tr>
          </thead>
           {/* table body section */}
           <tbody className='w-full flex flex-col'>
            {orders.map((order, index)=>{
              
              const {_id, createdAt, subtotal, delivery_status,payment_status} = order;

              return(
                <tr key={index}
                className={index % 2 !==0 ? ' w-full justify-between flex text-sm bg bg-slate-300 border-2 border-slate-500 my-1': 
                ' w-full justify-between flex text-sm bg bg-slate-200 border-2 border-slate-500 my-1'}>
                   
                   <td className='flex w-[13%] justify-center'>{order.shipping.name}</td>
                   <td className='flex w-[13%] justify-center'>{moment(createdAt).fromNow()}</td>
                   <td className='flex w-[12%] justify-center'>{`$${subtotal.toFixed(2)}`}</td>
                   <td className={
                    delivery_status === 'Pending'
                    ? 'text-slate-500'
                    : delivery_status === 'Processing'
                    ? 'text-orange-400'
                    : delivery_status === 'Deliveried'
                    ? 'text-green-600'
                    : ''
                    }>
                      <b>{delivery_status}</b>
                   </td>
                   <td className={payment_status === 'paid'? 'flex w-[12%] justify-center text-green-600 font-bold' : 'flex w-[12%] justify-center text-slate-600 font-bold' }>{payment_status}
                   </td>
                   <td className='flex w-[22%] justify-center '>{_id}</td>
                   <td className='flex w-[16%] justify-center gap-6'>
                      <Link to={`/admin/order-details/${_id}`}>
                        <AiFillEye className='text-[23px] text-sky-500'/>
                      </Link>
                      <AiFillCloseCircle onClick={()=>deleteHandler(_id)} className='text-[23px] text-red-600 cursor-pointer'/>
                      <Link to={`/admin/order-details/${_id}`}>
                        <AiFillEdit className='text-[23px] text-teal-600 cursor-pointer'/>
                      </Link>
                   </td>
                </tr>
              )
           
            })}
          </tbody>
      </table>
    </div>
  )
}

export default ViewOrders