import { useEffect, useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector ,useDispatch} from "react-redux";
import { loginuser } from "../features/auth/authSlie";
import Spinner from "../components/Spinner";

const inputStyle = 'w-full border-2 border-slate-700 px-3 py-1 my-2 rounded-lg outline-none relative';


const initialState ={
  email:'',
  password:''
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const {isLoading, isSuccess, user} = useSelector((state)=> state.auth);

  useEffect(()=>{
    if(isSuccess || user){
      navigate('/')
    }
  },[isSuccess, navigate, user]);

  const {password ,email} = formData;
  

  const onChangeHandler = (e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]:value})
  };

  const passwordHandler = ()=>{
    setShowPassword(!showPassword);
  }

  const loginUser =  (e)=>{
    e.preventDefault();
    const userData = {
      email,
      password
    }
    dispatch(loginuser(userData));
  };

  if(isLoading){
    return <Spinner/>
  }

  return (
  <>
  <div className=" flex flex-col w-full min-h-screen  items-center justify-center">
   
   <h1 className='text-center font-playfair font-extrabold text-xl md:text-4xl text-teal-500'>Login</h1>     
   <form onSubmit={loginUser} className="flex flex-col w-1/2 border-b-4 border-b-amber-500">  

   <input placeholder='Email' 
   type='email' 
   value={email} 
   name='email'
   onChange={onChangeHandler}
   className = {inputStyle}
   />  

   <div className="flex relative">    
   <input
   className={inputStyle}
   placeholder='Password'
   name="password"
   onChange={onChangeHandler}
   value={password}
   type={showPassword ? 'text' : 'password'} 
   />
   <div onClick={passwordHandler}>
   {showPassword ? <AiOutlineEyeInvisible size={20} className="absolute cursor-pointer right-2 top-[17px] text-slate-600"/> :
   <AiOutlineEye size={20} className="absolute cursor-pointer right-2 top-[17px] text-slate-600"/>}
   </div>
   </div>
  
   <button type='submit' className='mb-5 border-2 border-black text-white bg-teal-500'>Login</button>

   </form> 
   <span className="flex items-center text-sm text-slate-500 py-4 cursor-default">Don't have an account? 
   <p to='/register' className="text-teal-600 text-sm md:text-xl hover:scale-110 duration-1000">
       &nbsp;<Link to='/register'>Register</Link>
   </p>
   </span>

   <p className="text-slate-500 font-thin italic font-playfair hover:scale-110 duration-1000">
    <Link to='/forgotpassword'>Forgot Password?</Link>
   </p>
   </div>
    </>
  )
}

export default Login