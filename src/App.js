import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cart from './components/Cart';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Admin from './pages/Admin';
import AdminRoute from './components/AdminRoute';
import { useDispatch } from 'react-redux';
import { setUser } from './features/auth/authSlie';
import { useEffect } from 'react';
import ProductDetails from './components/product/ProductDetails';
import UserOrders from './pages/UserOrders';
import OrderDetails from './components/admin/viewOrders/OrderDetails';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch,user]);


  return (
    <>
    <BrowserRouter>
      <Header/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/> 
        <Route path='/cart' element={<Cart/>}/> 
        <Route path='/user-orders' element={<UserOrders/>}/> 
        <Route path='/user-order-details/:id' element={<OrderDetails/>}/> 
        <Route path='/checkout-success' element={<CheckoutSuccess/>}/> 
        <Route path='/product-details/:id' element={<ProductDetails/>}/> 
        <Route path='/admin/*' element={<AdminRoute><Admin/></AdminRoute>}/> 
        <Route path='*' element={<NotFound/>}/> 
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App