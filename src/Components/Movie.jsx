import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../Partials/Topnav'
import Dropdown from '../Partials/Dropdown'
import axios from '../Utils/axios'
import Cards from '../Partials/Cards'
import Loading from './Loading'

function Movie() {
    document.title = "Movie App | Movies"
    const navigate = useNavigate()
    const [category, setCategory] = useState('now_playing')
    const [movie, setMovie] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const GetMovie = async ()=> {
        try {
          const {data} = await axios.get(`/movie/${category}?page=${page}`)
          if (data.results.length > 0){
            setMovie((prev)=> [...prev, ...data.results])
          setPage(page + 1)
          }else{
            setHasMore(false)
          }
          
          console.log(data)
        } catch (error) {
          console.log("Error:",error)
        }
      }

      const refreshHandler = () => {
        if (movie.length === 0){
          GetMovie()
        } else{
          setPage(1)
          setMovie([])
          GetMovie()
        }
      }

      useEffect(()=>{
        refreshHandler()
      },[category])

     
      return movie.length > 0 ? (
        <div className='w-screen h-screen p-5 overflow-hidden overflow-y-auto'>
    
          <div className='w-full px-5 flex items-center'>
          <div className='flex items-center gap-6 w-[10%] text-zinc-300'>
          <i onClick={()=> navigate(-1)} className="text-3xl font-semibold ri-arrow-left-line"></i>
            <h1 className='text-3xl font-semibold'>Movies</h1>
          </div>
    
          <div className='w-[90%] flex items-center '>
            <Topnav />
            <Dropdown title="Category" options={['popular', 'top_rated', 'upcoming', 'now_playing']} funct={(e)=> setCategory(e.target.value)} />
            <div className='w-[2%]'></div>
          </div>
          </div>
    
          <InfiniteScroll
          dataLength={movie.length}
          next={GetMovie()}
          hasMore={hasMore}
          loader={<h1>Loading</h1>}
          >
            
          <Cards data={movie} title='movie'/>
    
          </InfiniteScroll>
    
    
        </div>
      ) : <Loading />
}

export default Movie
