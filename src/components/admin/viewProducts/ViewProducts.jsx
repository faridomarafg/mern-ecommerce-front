import { useEffect } from 'react';
import {FiSearch} from 'react-icons/fi';
import { useDispatch,useSelector } from 'react-redux';
import { getAllProducts, deleteProduct } from '../../../features/product/productSlice';
import {AiFillEye, AiFillEdit, AiFillDelete} from 'react-icons/ai'
import { Link } from 'react-router-dom';

function ViewProducts() {
  const dispatch = useDispatch();
  const {products} = useSelector((state)=> state.products);



  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch]);

  const deleteHandler = (id)=>{
    dispatch(deleteProduct(id));
  };

  return (
    <div className='flex flex-col w-full border-l-2 border-l-slate-500 h-screen'>
       {/* Header of the page */}
       <div className='flex flex-col sm:flex-row md:flex-row w-full justify-center sm:justify-between md:justify-between px-3 bg-slate-500 h-[121px] items-center gap-2 sm:gap-0 md:gap-0'>
          <div className='flex'>
            <h1 className='sm:text-[22px] md:text-[22px] font-bold font-mono text-white'>All Available Products In Store</h1>
            <span className='text-amber-500 font-mono text-2xl font-bold pl-5'>{products.length}</span>
          </div>
          <div className='flex w-full sm:w-[30%] md:w-[30%] items-center relative'>
              <input className='border-2 h-fit w-full rounded-lg py-1 outline-none px-2'
              type="text" 
              placeholder='Search For Product' 
              />
              <FiSearch className='text-[20px] absolute right-1'/>
          </div>
       </div>

       {/* prodcut section */}
       <div>
          <div>
           {products?.map((product, index)=>{
            const {brand,name,price,image,quantity,_id} = product;
            return(
            <div key={index} className={index % 2 !== 0 ? 'flex flex-col sm:flex-row md:flex-row gap-1 sm:gap-4 md:gap-4 w-full items-center  justify-center sm:justify-between md:justify-between px-0  sm:px-3 md:px-3 border-2 py-1 bg-slate-400':
            'flex flex-col sm:flex-row md:flex-row gap-1 sm:gap-4 md:gap-4 w-full items-center  justify-center sm:justify-between md:justify-between px-0  sm:px-3 md:px-3 border-2 py-1 bg-slate-200'
            }>
              <div className='flex items-center'>
                {/* product index */}
                <div className='flex bg-amber-500 w-[20px] h-[20px] items-center justify-center rounded-full p-2 text-white'>
                  <span>{index + 1}</span>
                </div>
                {/* product image */}
                <div className='w-[200px] h-[70px]'>
                  <img src={image.url} alt={name} className='w-full h-full object-contain'/>
                </div>
              </div>
              {/* product name */}
              <div className='flex flex-col items-center'>
                <p>Name</p>
                <span>{name}</span>
              </div>
              {/* product price */}
              <div className='flex flex-col items-center'>
                <p>Price</p>
                <span>${price}</span>
              </div>
              {/* product brand */}
              <div className='flex flex-col items-center'>
                <p>Brand</p>
                <span>{brand}</span>
              </div> 
              {/* product quantity */}
              <div className='flex flex-col items-center'>
                 <p>Quantity</p>
                 <span>{quantity}</span>
              </div>
              {/* actions */}
              <div className='flex flex-col items-center'>
                 <h1>Actions</h1>
                 <div className='flex w-full gap-10 text-[23px]'>
                    <Link to={`/product-details/${_id}`}>
                      <AiFillEye className='cursor-pointer text-blue-600' />
                    </Link>
                    <Link to={`/admin/update-product/${_id}`}>
                      <AiFillEdit className='cursor-pointer text-teal-600' />
                    </Link>
                    <AiFillDelete onClick={()=>deleteHandler(_id)} className='cursor-pointer text-red-600' />
                 </div>
              </div>
            </div>
            )
           })}
          </div>
       </div>
    </div>
  )
}

export default ViewProducts