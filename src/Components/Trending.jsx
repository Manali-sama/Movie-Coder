import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../Partials/Topnav'
import Dropdown from '../Partials/Dropdown'
import axios from '../Utils/axios'
import Cards from '../Partials/Cards'
import Loading from './Loading'


function Trending() {
  document.title = "Movie App | Trending"
    const navigate = useNavigate()
    const [category, setCategory] = useState('all')
    const [duration, setDuration] = useState('week')
    const [trending, setTrending] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const GetTrending = async ()=> {
        try {
          const {data} = await axios.get(`/trending/${category}/${duration}?page=${page}`)
          if (data.results.length > 0){
            setTrending((prev)=> [...prev, ...data.results])
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
        if (trending.length === 0){
          GetTrending()
        } else{
          setPage(1)
          setTrending([])
          GetTrending()
        }
      }

      useEffect(()=>{
        refreshHandler()
      },[category, duration])

      console.log(trending)


  return trending.length > 0 ? (
    <div className='w-screen h-screen p-5 overflow-hidden overflow-y-auto'>

      <div className='w-full px-5 flex items-center'>
      <div className='flex items-center gap-6 w-[10%] text-zinc-300'>
      <i onClick={()=> navigate(-1)} className="text-3xl font-semibold ri-arrow-left-line"></i>
        <h1 className='text-3xl font-semibold'>Trending</h1>
      </div>

      <div className='w-[90%] flex items-center '>
        <Topnav />
        <Dropdown title="Category" options={['tv', 'movie', 'all']} funct={(e)=> setCategory(e.target.value)} />
        <div className='w-[2%]'></div>
        <Dropdown title="Duration" options={['day', 'week']} funct={(e)=> setDuration(e.target.value)} />
      </div>
      </div>

      <InfiniteScroll
      dataLength={trending.length}
      next={GetTrending()}
      hasMore={hasMore}
      loader={<h1>Loading</h1>}
      >
        
      <Cards data={trending} title={category} />

      </InfiniteScroll>


    </div>
  ) : <Loading />
}

export default Trending
