import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Notfound from '../Components/Notfound'

function Trailers() {
    const navigate = useNavigate()
    const {pathname}=useLocation()
    const category = pathname.includes('movie') ? 'movie' : 'tv'
    const ytvideos = useSelector(state => state[category].info.videos)
    console.log(ytvideos)
  return (
    <div className='w-screen h-screen absolute top-0 left-0 text-white flex items-center justify-center bg-[rgba(0,0,0,.8)]'>
        <Link>
        <i onClick={()=> navigate(-1)} className="text-3xl absolute top-[5%] right-[5%] font-semibold ri-close-fill"></i>
        </Link>
        
      {ytvideos ? <ReactPlayer
      controls
      height={500}
      width={1000}
      url={`https://www.youtube.com/watch?v=${ytvideos.key}`}
       />: <Notfound />}
    </div>
  )
}

export default Trailers
