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

//Create Category
export const createCategory = (categoryData)=> API.post('api/category',categoryData);

//Get all Categories
export const getCategories = ()=> API.get('api/category');

//Get single Category
export const getCategory = (id)=> API.get('api/category',id);

//Delete Category
export const deleteCategory = (id)=> API.delete(`api/category/${id}`);

//Update Category
export const updateCategory = (id, categoryData)=> API.put(`api/category/${id}`, categoryData);