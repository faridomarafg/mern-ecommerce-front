import axios from 'axios';
import { useSelector } from 'react-redux';

const url = process.env.REACT_APP_BACKEND_URL;

function PayButoon({cartItems}) {
    const {user} = useSelector((state)=> state.auth);

    const handleCheckout = ()=>{

       axios.post(`${url}/api/stripe/create-checkout`,{
        cartItems,
        userId: user?.user._id
       })
       .then((res)=>{
        if(res.data.url){
          window.location.href = res.data.url
        }
       }).catch((err)=> console.log(err.message));
   };

  return (
    <div>
       {user? 
       (<>
        <button className="w-full bg-sky-500 text-white py-1 rounded-lg my-5"
        onClick={()=> handleCheckout()}>
            Checkout
        </button>
       </>) 
       :
       (<>
        <div className='flex flex-col'>
          <button disabled className="w-full cursor-not-allowed bg-slate-300 text-white py-1 rounded-lg my-5"
          onClick={()=> handleCheckout()}>
              Checkout
          </button>
          <span className='text-sm font-thin cursor-default text-amber-500'>PLEASE LOG IN TO ACTIVATE CHECKOUT PROCESS</span>
        </div>
       </>)}
    </div>
  )
}

export default PayButoon