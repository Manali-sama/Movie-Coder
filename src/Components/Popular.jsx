import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../Partials/Topnav'
import Dropdown from '../Partials/Dropdown'
import axios from '../Utils/axios'
import Cards from '../Partials/Cards'
import Loading from './Loading'

function Popular() {
    document.title = "Movie App | Popular"
    const navigate = useNavigate()
    const [category, setCategory] = useState('movie')
    const [popular, setpopular] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const GetPopular = async ()=> {
        try {
          const {data} = await axios.get(`${category}/popular?page=${page}`)
          if (data.results.length > 0){
            setpopular((prev)=> [...prev, ...data.results])
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
        if (popular.length === 0){
          GetPopular()
        } else{
          setPage(1)
          setpopular([])
          GetPopular()
        }
      }

      useEffect(()=>{
        refreshHandler()
      },[category])



  return popular.length > 0 ? (
    <div className='w-screen h-screen p-5 overflow-hidden overflow-y-auto'>

      <div className='w-full px-5 flex items-center'>
      <div className='flex items-center gap-6 w-[10%] text-zinc-300'>
      <i onClick={()=> navigate(-1)} className="text-3xl font-semibold ri-arrow-left-line"></i>
        <h1 className='text-3xl font-semibold'>Popular</h1>
      </div>

      <div className='w-[90%] flex items-center '>
        <Topnav />
        <Dropdown title="Category" options={['tv', 'movie']} funct={(e)=> setCategory(e.target.value)} />
      </div>
      </div>

      <InfiniteScroll
      dataLength={popular.length}
      next={GetPopular()}
      hasMore={hasMore}
      loader={<h1>Loading</h1>}
      >
        
      <Cards data={popular} title={category} />

      </InfiniteScroll>


    </div>
  ) : <Loading />
}

export default Popular
