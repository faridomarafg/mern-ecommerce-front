import {useParams} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getSingleProduct } from '../../features/product/productSlice';


function ProductDetails() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {product} = useSelector((state)=> state.products);

    console.log(product);

    useEffect(()=>{
       dispatch(getSingleProduct(id))
    },[dispatch,id]);
  return (
     <div className='flex w-full h-fit items-center justify-center font-playfair text-sm sm:text-lg md:text-lg'>
        <div className='flex flex-col w-[80%] h-full  items-center justify-center mt-0 sm:mt-16 md:mt-16  border shadow-lg'>
        <div className='flex flex-col sm:flex-row md:flex-row w-[50%] border-b-2 gap-2'>
            <div className='flex-1 w-full h-[300px]'>
                <img className='w-full h-full' 
                src={product?.image?.secure_url} alt={product.name} />
            </div>
            <div className='flex-1'>
                <div className='flex'>
                <h1><b>Name :</b></h1>
                <p>{product.name}</p> 
                </div>
                <div className='flex'>
                <h1><b>Brand :</b></h1>
                <p>{product.brand}</p> 
                </div>
                <div className='flex'>
                <h1><b>Price :</b></h1>
                <p className='text-amber-400 font-bold'>{product.price}</p> 
                </div>
            </div>
        </div>
        {/* description section */}
        <div className='flex flex-col p-4'>
            <h1><b>Description</b></h1>
            <p>{product.desc}</p> 
        </div>
       </div>
    </div>
  )
}

export default ProductDetails