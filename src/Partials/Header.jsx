import React from 'react'
import { Link } from 'react-router-dom'

function Header({data}) {
    
  return (
    <div style={{background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original${data.backdrop_path || data.profile_path})`,
    backgroundSize: `cover`,
    backgroundPosition: `top[30%]`
}} 
        className='w-[90%] mx-[5%] rounded-lg h-[52vh] flex flex-col justify-end items-start p-[3%]'>
            <h1 className='w-[70%] text-5xl text-white font-semibold'>{data.name || data.title || data.original_name || data.original_title}</h1>
            <p className='w-[70%] text-white mt-3'>{data.overview.slice(0, 200)}...<Link to={`/${data.media_type}/details/${data.id}`} className='text-[#988af4]'>more</Link></p>
            <p className='text-white mt-1'><i className="mr-1 text-yellow-500 ri-megaphone-fill"></i>{data.release_date || data.first_air_date}
               <i className="ml-4 mr-1 text-yellow-500 ri-album-fill"></i>{data.media_type.toUpperCase()}
            </p>
            <Link to={`${data.media_type}/details/${data.id}/trailer`}
            style={{
              background: `linear-gradient(rgba(0,0,0,0.2),rgba(150,0,0,0.5),rgba(250,0,0,.8))`,
            }}
             className='p-3 text-white rounded mt-2'>Watch Trailer</Link>
      
    </div>
  )
}

export default Header
