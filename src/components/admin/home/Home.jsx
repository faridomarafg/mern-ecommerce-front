// import { useState, useEffect } from 'react';
// import {FaUsers,FaChartBar,FaClipboard} from 'react-icons/fa';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';

// const url = process.env.REACT_APP_BACKEND_URL;

// const setHeaders = ()=>{
//    const headers = {
//       headers: {
//          "Bearer ": localStorage.getItem('user')
//       }
//    }

//    return headers
// }

// function Home() {
//    const dispatch = useDispatch();

//    const [user, setUser] = useState([]);
//    const [userPercentage, setUserPercentage] = useState(0);

//    const [order, setOrder] = useState([]);
//    const [orderPercentage, setOrderPercentage] = useState(0);

//    const [incom, setIncom] = useState([]);
//    const [incomPercentage, setIncomPercentage] = useState(0);

//    console.log(incom);

//    console.log(userPercentage);

//    const compare = (a,b)=>{
//       if(a._id < b._id){
//          return 1
//       }
//       if(a._id > b._id){
//          return -1
//       }
//       return 0;
//    };
 
//    useEffect(()=>{// it used for users
//       const fetchData = async ()=>{
//          try {
//            const res = await axios.get(`${url}/status`, setHeaders())
           
//            res.data.sort(compare)
//            setUser(res.data)
//            setUserPercentage(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100)
//          } catch (error) {
//            console.log(error); 
//          }
//       };

//       fetchData()
//    },[]);


//    useEffect(()=>{// it used for orders
//       const fetchData = async ()=>{
//          try {
//            const res = await axios.get(`${url}/order-status`, setHeaders())
           
//            res.data.sort(compare)
//            setOrder(res.data)
//            setOrderPercentage(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100)
//          } catch (error) {
//            console.log(error); 
//          }
//       };

//       fetchData()
//    },[]);

//    useEffect(()=>{// it used for incomes
//       const fetchData = async ()=>{
//          try {
//            const res = await axios.get(`${url}/income-status`, setHeaders())
           
//            res.data.sort(compare)
//            setIncom(res.data)
//            setIncomPercentage(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100)
//          } catch (error) {
//            console.log(error); 
//          }
//       };

//       fetchData()
//    },[]);
 

//   return (
//     <div className='flex' >
//        {/* left side */}
//        <div>
//         {/* Overview */}
//         <div className='flex flex-col m-5 p-5 bg-slate-500 text-white font-playfair rounded-lg'>
//           <h1 className='text-2xl'>Overview</h1>
//           <h2>How the shop is performing compared to the previous mounth</h2>
//           {/* icons section */}
//           <div className='grid grid-cols-3 gap-10 py-5'>
//              <div className='flex items-center gap-3'>
//                 <FaUsers className=' text-5xl text-sky-500'/>
//                 {/* digists */}
//                 <div>
//                 <p>{user[0]?.total}</p>
//                 <p>User</p>
//                 </div> 
//                 {/* Percentage */}
//                 <p className='font-mono text-green-600 font-bold'>{userPercentage}%</p>
//              </div>
//              <div className='flex items-center gap-3'>
//                 <FaClipboard className=' text-5xl text-yellow-500'/>
//                 {/* digists */}
//                 <div>
//                 <p>{order[0]?.total}</p>
//                 <p>Orders</p>
//                 </div> 
//                 {/* Percentage */}
//                 <p className='font-mono text-green-600 font-bold'>{orderPercentage}%</p>
//              </div>
//              <div className='flex items-center gap-3'>
//                 <FaChartBar className=' text-5xl text-amber-500'/>
//                 {/* digists */}
//                 <div>
//                 <p className='font-mono'>${incom[0]?.total}</p>
//                 <p>Earning</p>
//                 </div> 
//                 {/* Percentage */}
//                 <p className='font-mono text-green-600 font-bold'>{Math.floor(incomPercentage)}%</p>
//              </div>
//           </div>
//         </div>
//        </div>
//        {/* right side */}
//        <div>

//        </div>
//     </div>
//   )
// }

// export default Home

import React from 'react'

function Home() {
  return (
    <div>Home</div>
  )
}

export default Home