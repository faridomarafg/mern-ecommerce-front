import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex flex-col w-full h-screen items-center justify-center bg-slate-800'>
        <h1 className=' text-2xl sm:text-4xl md:text-6xl text-white'>404</h1>
        <h1 className=' text-2xl  text-white'>Page not found</h1>
        <button className='bg-teal-600 py-1 px-4 rounded-lg w-fit text-white my-3'>
           <Link to='/'>&larr;Back to home page</Link>
        </button>
    </div>
  )
}

export default NotFound