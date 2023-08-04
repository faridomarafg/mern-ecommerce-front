import React from 'react'

function Spinner() {
  return (
    <div className='w-full h-fit flex flex-col items-center justify-center  opacity-70'>
        <h1 className='text-teal-600 font-extrabold text-xl sm:m-4 md:text-6xl'>Loading...</h1>
        <p className='text-slate-500 font-mono'>please wait, proudut is loading...</p>
    </div>
  )
}

export default Spinner