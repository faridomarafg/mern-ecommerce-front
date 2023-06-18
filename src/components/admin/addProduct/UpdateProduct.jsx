import { useState, useEffect } from 'react';
import {toast} from 'react-toastify'; 
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from '../../Spinner';
import { useDispatch } from 'react-redux';
import {updateProduct } from '../../../features/product/productSlice';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../features/category/categorySlice';

const inputStyle = 'w-full px-2 py-1 border-2 border-slate-500 rounded-lg my-2 outline-none';

const initialState = {
  name:"",
  price:0,
  category:"",
  brand:"",
  desc:"",
  quantity:0
};

function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams();

  const [productData, setProductData] = useState(initialState);
  
 
  const {name, price, category, brand, desc,quantity} = productData;

  const {isLoading, isSuccess, isError, message, products} = useSelector((state)=> state.products);

  const {categories} = useSelector((state)=> state.category);

  const singleProduct = products.find((item)=> item._id === id);

  const [productImage, setProductImage] = useState(singleProduct.image.secure_url);

  useEffect(()=>{
    setProductData({...singleProduct});
  },[singleProduct])

  console.log(categories);

  useEffect(()=>{
    dispatch(getCategories())
  },[dispatch]);

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      toast.success('Product created successfully!',{position:'top-center'});
      navigate('/');
    }
  },[navigate,isError, isSuccess, message]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  
  const handleImageUpload = (e)=>{
     const file = e.target.files[0];
     imageToBase64(file);
  };

  const imageToBase64 = (file)=>{
    const reader = new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        setProductImage(reader.result) 
      }
    }else{
      setProductImage('');
    }
  }

  const addProduct  = async (e)=>{
    e.preventDefault()
   
    const productData = {
      name,
      price,
      desc,
      brand,
      category,
      quantity,
      image: productImage
    }
    
   dispatch(updateProduct({productData,id}));
  }

  if(isLoading){
    return <Spinner/>
  }

return (
  <>  
      {/* {isLoading && <Spinner/>} */}
      <div className='flex flex-col w-full h-full p-5 ' >
      <h1 className='text-4xl'>Add New Product</h1>
    <form onSubmit={addProduct} className='flex flex-col md:flex-row sm:flex-row w-full gap-5'>
        {/* right side  */}
        <div className='flex flex-col w-full sm:w-[50%] md:w-[50%]'>
        <label htmlFor="name">Product Name</label> 
        <input className={inputStyle} 
        placeholder='Product Name' 
        type='text' 
        name='name'  
        value={name} onChange={onChangeHandler}
        />

      <label htmlFor="name">Product Price</label> 
      <input className={inputStyle} 
      placeholder='Product Price' 
      type='number' 
      name='price'  
      value={price} 
      onChange={onChangeHandler}
      />

      <label htmlFor="name">Product Quantity</label> 
      <input className={inputStyle} 
      placeholder='Product Category' 
      type='number' 
      name='quantity'  
      value={quantity} 
      onChange={onChangeHandler}
      />
      <label htmlFor="name">Product Category</label> 
      <select className='border-2 border-slate-500 rounded-lg outline-none py-2 mb-3' 
        name='category' value={category} onChange={onChangeHandler}>

        <option value='' disabled> -- choose product category</option>
        {categories.map((cat, index)=>(
          <option key={index} value={cat.name}>
              {cat.name}
          </option>
        ))}
      </select> 

      <label htmlFor="name">Product Company/brand</label> 
      <input className={inputStyle} 
      placeholder='Product Brand' 
      type='text' 
      name='brand'  
      value={brand} 
      onChange={onChangeHandler}
      />

      <label htmlFor="name">Product Description</label> 
      <textarea className='my-0 mb-3 border-2 border-slate-500 p-2 outline-none' 
      placeholder='Product Description' 
      type='text' 
      name='desc'  
      value={desc}
      cols='30'
      rows='5' 
      onChange={onChangeHandler}
      />

      <button className='py-1 text-white bg-blue-500' type='submit'>Save Product</button>
      
        </div>
        {/* left side */}
        <div className='flex flex-col w-full sm:w-[50%] md:w-[50%]'>
        <label htmlFor="img">Product Image</label>
        <div className='flex items-center justify-center w-full bg-blue-200 mb-3 rounded-t-lg '>
          <label htmlFor='profileImage' className='w-full h-full'>
          <div className='w-full h-[480px] flex items-center justify-center'>
              {
              productImage ?  <img className='w-full h-full object-cover' alt='postPhoto' src={productImage}  />  
              :
              <p className='text-sm p-1 text-white cursor-pointer'>Upload</p>
              }
          </div>
          <input type={"file"} id="profileImage" accept='image/*' className='hidden' value='' onChange={handleImageUpload}  />
          </label>
        </div> 
      </div>
    </form>
  </div>
  </> 
)
}

export default UpdateProduct