import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getOrderByUserID } from '../features/order/orderSlice';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function UserOrders() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth);
    const {userOrders} = useSelector((state)=> state.order);

    console.log(userOrders);

    const userId =  user?.user?._id;

    useEffect(()=>{
        if(userId){
            dispatch(getOrderByUserID(userId))
        }
    },[dispatch, userId]);

    const onClickHandler = (id)=>{
       navigate(`/user-order-details/${id}`)
    }

    return (
        <div className='flex flex-col w-full h-screen'>
          <h1 className='flex w-full text-3xl p-4 font-bold text-slate-500'>All orders</h1>
          <div className='w-full flex flex-col'>
                {userOrders.map((order, index)=>{
                  
                  const {_id, createdAt, subtotal, delivery_status,payment_status} = order;
    
                  return(
                    <div key={index} className="w-full overflow-x-auto text-[9px] ss:text-[16px]">
                    <table className="w-full table-auto">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Order ID</th>
                          <th className="px-4 py-2">Created At</th>
                          <th className="px-4 py-2">Subtotal</th>
                          <th className="px-4 py-2">Delivery Status</th>
                          <th className="px-4 py-2">Payment Status</th>
                        </tr>
                      </thead>
                      <tbody onClick={()=>onClickHandler(_id)} className='bg-slate-300 cursor-pointer'>
                        <tr>
                          <td className="border px-4 py-2 text-slate-700 font-semibold">{_id}</td>
                          <td className="border px-4 py-2 font-semibold text-slate-500 font-mono">{moment(createdAt).fromNow()}</td>
                          <td className="border px-4 py-2 text-blue-500 font-semibold">${subtotal}</td>
                          <td 
                         className={`border px-4 py-2 font-semibold ${
                          delivery_status === 'Pending'
                            ? 'text-slate-500'
                            : delivery_status === 'Processing'
                            ? 'text-orange-400'
                            : delivery_status === 'Deliveried'
                            ? 'text-green-600'
                            : ''
                           }`}
                          >{delivery_status}</td>
                          <td className={payment_status === 'paid' ? 
                          "border px-4 py-2 text-green-500 font-semibold" : "border px-4 py-2 text-slate-500 font-semibold"}>{payment_status}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  )
               
                })}
            </div>
        </div>
      )
}

export default UserOrders