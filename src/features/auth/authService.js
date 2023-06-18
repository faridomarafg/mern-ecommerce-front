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


//login-endpoint
export const login = (userData)=> API.post('/api/users/login', userData);

//login-endpoint
export const register = (userData)=> API.post('/api/users/register', userData);