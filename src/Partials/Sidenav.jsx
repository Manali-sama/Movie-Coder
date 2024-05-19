import React from 'react'
import { Link } from 'react-router-dom'

function Sidenav() {
  return (
      <div className='w-[20%] h-full p-10 border-r-2 border-zinc-400 '>
        <h1 className='text-2xl '>  
          <i className="text-[#6556CD] mr-2 ri-tv-fill"></i>
            <span className='text-zinc-200 font-bold'>Movie Coder.</span>
            </h1>
        <nav className='flex flex-col gap-2 text-zinc-500 '>
        <h1 className='font-semibold text-zinc-200 mt-10 text-lg mb-3'>New Feeds</h1>
        <Link to='/trending' className='w-full  rounded-md hover:bg-red-500 hover:text-white hover:px-3 py-3 duration-500'>
        <i className="mr-2 ri-fire-fill"></i>
        Trending
        </Link>
        <Link to='/popular' className='w-full  rounded-md hover:bg-red-500 hover:text-white hover:px-3 py-3 duration-500'>
        <i className="mr-2 ri-bard-fill"></i>
        Popular
        </Link>
        <Link to='/movie' className='w-full  rounded-md hover:bg-red-500 hover:text-white hover:px-3 py-3 duration-500'>
        <i className="mr-2 ri-movie-2-fill"></i>
        Movies
        </Link>
        <Link to='/tv' className='w-full  rounded-md hover:bg-red-500 hover:text-white hover:px-3 py-3 duration-500'>
        <i className="mr-2 ri-tv-fill"></i>
        TV Shows
        </Link>
        <Link to='/person' className='w-full  rounded-md hover:bg-red-500 hover:text-white hover:px-3 py-3 duration-500'>
        <i className="mr-2 ri-team-fill"></i>
        People
        </Link>
        </nav>
        <hr className='bg-zinc-400 border-none h-[1px] mt-2' />
        <nav className='flex flex-col gap-2 text-zinc-500 '>
        <h1 className='font-semibold text-zinc-200 text-lg mt-5 mb-3'>Website Information</h1>
        <Link className='w-full  rounded-md hover:bg-[#6556CD]  hover:text-white hover:px-3 py-3 duration-300'>
        <i className="mr-2 ri-information-2-fill"></i>
        About 
        </Link>
        <Link className='w-full  rounded-md hover:bg-[#6556CD] duration-300 hover:text-white hover:px-3 py-3'>
        <i className="mr-2 ri-phone-fill"></i>
        Contact Us
        </Link>
        
        </nav>
      </div>
    
  )
}

export default Sidenav
