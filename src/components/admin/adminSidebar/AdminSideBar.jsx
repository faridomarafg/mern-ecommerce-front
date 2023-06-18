import {FaUserCircle} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';

let linkStyle ='text-[12px] sm:text-[14px] md:text-[16px] py-1 sm:py-2 md:py-3 border-y border-y-slate-500 w-full pl-4 text-slate-500 hover:bg-slate-200 duration-1000'

const isActiveStyle = ({isActive})=> (isActive ? 'text-white font-bold bg-slate-700 text-[12px] sm:text-[14px] md:text-[16px] py-1 sm:py-2 md:py-3 border-y border-y-slate-500 w-full pl-4 text-slate-500 duration-1000': `${linkStyle}`);

function AdminSideBar() {
  return (
    <div className='flex flex-col h-[586px]'>
        <header className='flex flex-col bg-blue-400 h-[120px] items-center justify-center'>
            <div className='flex flex-col items-center'>
                <FaUserCircle className='text-[45px] text-slate-700'/>
                <h1 className='text-[12px] sm:text-[18px] md:text-[20px] text-slate-200 font-playfair cursor-default'>Admin as :&nbsp;
                <span className='text-amber-400 font-playfair font-semibold text-xl'>Logged User</span>
                </h1>
            </div>
        </header>

        <ul className='flex flex-col items-start'>
        <NavLink to='home' className={isActiveStyle ? isActiveStyle :  linkStyle}>
          <p className='hover:scale-105 duration-700'>Home</p>
        </NavLink>
        <NavLink to='all-products' className={isActiveStyle ? isActiveStyle :  linkStyle}>
          <p className='hover:scale-105 duration-700'>View Products</p>
        </NavLink>
        <NavLink to='add-product' className={isActiveStyle ? isActiveStyle :  linkStyle}>
          <p className='hover:scale-105 duration-700'>Add product</p>
        </NavLink>
        <NavLink to='orders' className={isActiveStyle ? isActiveStyle :  linkStyle}>
          <p className='hover:scale-105 duration-700'>View Orders</p>
        </NavLink>
        <NavLink to='categories' className={isActiveStyle ? isActiveStyle :  linkStyle}>
          <p className='hover:scale-105 duration-700'>Manage Categories</p>
        </NavLink>
        </ul>
    </div>
  )
}

export default AdminSideBar