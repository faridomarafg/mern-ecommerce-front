import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../features/cartSlice';

function ProductCard({product}) {
    const dispatch = useDispatch();

    const handleAddToCart = (product)=>{
        dispatch(addToCart(product));
    };
    
    const shortenText = (text, n)=>{
        if(text.length > n){
          const shortenedText = text.substring(0,n).concat('...');
          return shortenedText;
        };
        return text;
     };

  return (
    <div className='flex flex-col w-full sm:w-[80%] md:w-[80%] max-h-full  items-start border-2 shadow-md rounded-lg'>
        <span className='px-2 text-slate-500 font-playfair font-bold'>{product.name}</span>
        <div className='w-full h-[250px]'>
            <Link  to={`product-details/${product._id}`}>
                <img src={product.image.url} alt={product.name} 
                className='flex w-full h-full'
                />
            </Link>
        </div>
        <div className='flex w-full justify-between border'>
            <div>
                <span className='text-amber-500 font-mono'>${product.price}</span>
            </div>
            <div>
                <button onClick={()=>handleAddToCart(product)}
                className='bg-amber-500 text-white  px-2'>
                Add to card
                </button>
            </div>
        </div>
        <div className='py-1 bg-teal-600 w-full text-white'>
            <p>{shortenText(product.desc, 20)}</p>
        </div>
    </div>
  )
}

export default ProductCard