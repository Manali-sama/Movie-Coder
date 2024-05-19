import axios from '../Utils/axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Topnav() {
    const [query, setquery] = useState("")
    const [search, setSearch] = useState([])
    
    const GetSearches = async ()=> {
      try {
        const {data} = await axios.get(`/search/multi?query=${query}`)
        
        setSearch(data.results)
      } catch (error) {
        console.log("Error:",error)
      }
    }

    useEffect(()=>{
      GetSearches()
    },[query])

  return (
    <div className='w-full h-[8vh] relative flex justify-start pl-[15%] items-center'>
      <i className="text-2xl text-zinc-400 ri-search-line"></i>
      <input 
      onChange={e => setquery(e.target.value)}
       value={query} 
       className='w-[50%] mx-5 p-2 text-lg border-none outline-none bg-transparent text-zinc-300' type="text" placeholder='Search...' />
       {query.length > 0 && <i onClick={()=> setquery("")} className="text-3xl text-zinc-400 ri-close-fill"></i>}
      
      <div className='z-[100] w-[50%] max-h-[50vh] absolute top-[90%] bg-[#353536] rounded-lg overflow-auto'>
        {search.map((s,i)=><Link to={`/${s.media_type}/details/${s.id}`} key={i} className='w-[100%] flex justify-start items-center px-2 py-3 hover:bg-[#3d3d3e]'>
            <img className='w-[10vh] object-contain bg-center mr-4 shadow-lg rounded' src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`: `https://st2.depositphotos.com/2102215/46681/v/450/depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg`} alt="" />
            <span className='text-lg font-medium text-zinc-200'>{s.name || s.title || s.original_name || s.original_title}</span>
        </Link>)}
        
        
      </div>
    </div>
  )
}

export default Topnav
