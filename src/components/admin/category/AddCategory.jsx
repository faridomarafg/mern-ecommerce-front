import { useEffect, useState } from 'react';
import {useParams, NavLink,useNavigate} from 'react-router-dom';
import {AiOutlineCloseCircle,AiFillEdit} from 'react-icons/ai';
import {toast} from 'react-toastify';
import {FiSearch} from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../../features/category/categorySlice';
import { setSearchQuery } from '../../../features/search/searchSlice';

const initialState = {
    name:''
};

function AddCategory() {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState(initialState);
  const {id} = useParams();

  const {name} = nameValue

  const {categories, isError, message} = useSelector((state)=> state.category);  
  
  const searchQuery = useSelector((state) => state.search.searchQuery);

  //find singleCategory to update
  const singleCategory = categories.find((item)=> item._id === id);

  console.log(categories);

  useEffect(()=>{
    if(isError){
        toast.info(message,{position: 'top-center'}) 
      }
      if(singleCategory){
        setNameValue({...singleCategory})
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  },[id, isError,message]);

  useEffect(()=>{
     disptach(getCategories());
  },[disptach]);

  const onChangeHandler =(e)=>{
      const {name, value} = e.target;
      setNameValue({...nameValue, [name]: value})
  };

  const onSubmitHandler = (e)=>{
     e.preventDefault();
     const categoryData ={
        name
     };

     if(!id){
        disptach(createCategory(categoryData))  
     }else{
        disptach(updateCategory({id, categoryData}))
        navigate('/admin/categories')
     }
     setNameValue(initialState)
  };

  const deleteHandler = (id)=>{
     disptach(deleteCategory(id))
  };

const handleSearchInputChange = (event) => {
  disptach(setSearchQuery(event.target.value));
};

const filteredCategory = categories.filter((item) =>
item.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className='flex flex-col border-l-2 border-slate-500 h-fit'>
      {/* header of the page   */}
      <div className="flex flex-col sm:flex-row md:flex-row w-full justify-center sm:justify-between md:justify-between px-3 bg-slate-500 h-[121px] items-center gap-2 sm:gap-0 md:gap-0">
        <h1 className="sm:text-[22px] md:text-[22px] font-extrabold font-mono text-white">
          All Available Catigories
        </h1>
        {/* SEARCH SECTION */}
        <div className="flex w-full sm:w-[30%] md:w-[30%] items-center relative">
          <input
            className="border-2 h-fit w-full rounded-lg py-1 outline-none px-2"
            type="text"
            placeholder="Search For Category"
            onChange={handleSearchInputChange}
          />
          <FiSearch className="text-[20px] absolute right-1" />
        </div>
      </div>

      {/* create category section */}
      <div className='flex w-full items-center py-10 bg-teal-600 px-3'>
        <div className='flex w-[40%]'>
        <h1 className='text-2xl w-full font-extrabold font-playfair text-amber-500'>{id? 'Updae Category' : 'Create Category'}</h1>
        </div>
        <form className='w-full' onSubmit={onSubmitHandler}>
            <div className='flex w-full gap-4'>
                <input className='border-2 border-slate-500 rounded-lg w-[100%] px-3 outline-none'
                name='name'
                value={name}
                onChange={onChangeHandler}
                type="text" 
                placeholder='Create Category' 
                />
                <button type='submit' className=' border-2 rounded-lg w-[40%] text-white'>{id ? 'Update' : 'Creare'}</button>
            </div>
        </form> 
      </div>
      {/* Fetching category section */}
      <div className='grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 py-3 justify-center'>
        {filteredCategory?.map((category)=>{
            const {name, _id} = category;
            return(
             <div key={_id} className='flex w-full justify-center'>
                <div className='flex items-center gap-4 bg-slate-400 m-3 rounded-lg border-2 px-3 py-1 w-full justify-center'>
                   <p className='text-white'>{name}</p>
                   <AiOutlineCloseCircle onClick={()=> deleteHandler(_id)} className='text-[20px] cursor-pointer text-red-600'/>
                   <NavLink to={`/admin/categories/${_id}`}>
                     <AiFillEdit className='text-[20px] cursor-pointer text-teal-600'/> 
                   </NavLink>
                </div>
             </div>
            )
        })}
      </div>
    </div>
  );
}

export default AddCategory