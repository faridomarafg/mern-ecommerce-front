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


//Get All Products
export const getProducts = () => API.get('/api/products');

//Get Single Product
export const getProduct = (id) => API.get(`/api/products/${id}`);

//CREATE PRODUCT
export const createProduct = (productData)=> API.post('/api/products', productData)

//DELETE PRODUCT
export const deleteProduct = (id)=> API.delete(`/api/products/${id}`);

//UPDATE PRODUCT
export const updateProduct = (id,productData)=> API.put(`/api/products/${id}`,productData);