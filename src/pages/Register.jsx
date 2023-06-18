import { useEffect, useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlie";
 

const inputStyle = 'w-full border-2 border-slate-700 px-3 py-1 my-2 rounded-lg outline-none relative';

const initialState = {
  name:'',
  email:'',
  password:'',
  cPassword:''
}

function Register() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfirmPassword] = useState(false);

  const {name, email, password, cPassword} = formData;

  const {isSuccess, isLoading, user} = useSelector((state)=> state.auth);

  useEffect(()=>{
    if(isSuccess || user){
      dispatch(reset())
      navigate('/login')
    }
  },[isSuccess,navigate, user, dispatch]);
  
  const onChangeHandler = (e)=>{
     const {name, value} = e.target;
     setFormData({...formData, [name]:value})
  };

  const passwordHandler = ()=>{
    setShowPassword(!showPassword);
  }

  const ConfrimPasswordHandler = ()=>{
    setShowConfirmPassword(!showConfrimPassword);
  }

  const registerUser = (e)=>{
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      cPassword
    }

    if(password !== cPassword){
      toast.error('Password are not match!')
    }else{
      dispatch(register(userData));
    }
  }

  if(isLoading){
    return <Spinner/>
  }

  return (
  <>
  <div className=" flex flex-col w-full min-h-screen items-center justify-center">
   
   <h1 className='text-center font-playfair font-extrabold text-xl md:text-4xl text-teal-500'>Register</h1>     
   <form onSubmit={registerUser} className="flex flex-col w-1/2 border-b-4 border-b-amber-500">  

   <input placeholder='Name' 
   type='text' 
   name='name'
   value={name} 
   onChange={onChangeHandler}
   className = {inputStyle}
   />  

   <input placeholder='Email' 
   type='email' 
   name='email'
   value={email} 
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

   <div className="w-full flex relative">
   <input 
   className={inputStyle}
   placeholder='Confrim Password'
   name="cPassword"
   onChange={onChangeHandler}
   value={cPassword}
   type={showConfrimPassword ? 'text' : 'password'} 
   />
   <div onClick={ConfrimPasswordHandler}>
   {showConfrimPassword ? <AiOutlineEyeInvisible size={20} className="absolute cursor-pointer right-2 top-[17px] text-slate-600"/> :
   <AiOutlineEye size={20} className="absolute cursor-pointer right-2 top-[17px] text-slate-600"/>}
   </div>
   </div>
  
   
   <button type='submit' className='mb-5 border-2 border-black text-white bg-teal-500'>Register</button>    
   </form> 
   <span className="flex items-center text-sm text-slate-500 py-4 cursor-default">Already have an account? 
   <p to='/register' className="text-teal-600 text-sm md:text-xl hover:scale-110 duration-1000">
       &nbsp;<Link to='/login'>Login</Link>
   </p>
   </span>

   </div>
    </>
  )
}

export default Register