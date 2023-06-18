import axios from "axios";

const API = axios.create({baseURL:process.env.REACT_APP_BACKEND_URL});

API.interceptors.request.use((req)=>{
   if(localStorage.getItem('user')){
     req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem('user')).token
     }`;
   }

   return req;
});



// GET ALL ORDERS
export const getAllOrders = ()=> API.get('/api/order');

//GET ORDER BY ID
export const getOrderByID = (id)=> API.get(`/api/order/${id}`);

//GET ORDER BY-USER-ID
export const getOrderByUserID = (id)=> API.get(`/api/order/user-order/${id}`);

//DELETE ORDER
export const deleteOrder = (id)=> API.delete(`/api/order/${id}`);

//UPDATE ORDER
export const updateOrder = (id,orderData)=> API.put(`/api/order/${id}`, orderData);