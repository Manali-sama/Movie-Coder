import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../Partials/Topnav'
import Dropdown from '../Partials/Dropdown'
import axios from '../Utils/axios'
import Cards from '../Partials/Cards'
import Loading from './Loading'

function People() {
    document.title = "Movie App | People"
    const navigate = useNavigate()
    const [category, setCategory] = useState('popular')
    const [person, setPerson] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const GetPerson = async ()=> {
        try {
          const {data} = await axios.get(`/person/popular?page=${page}`)
          if (data.results.length > 0){
            setPerson((prev)=> [...prev, ...data.results])
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
        if (person.length === 0){
          GetPerson()
        } else{
          setPage(1)
          setPerson([])
          GetPerson()
        }
      }

      useEffect(()=>{
        refreshHandler()
      },[category])

     
      return person.length > 0 ? (
        <div className='w-screen h-screen p-5 overflow-hidden overflow-y-auto'>
    
          <div className='w-full px-5 flex items-center'>
          <div className='flex items-center gap-6 w-[15%] text-zinc-300'>
          <i onClick={()=> navigate(-1)} className="text-3xl font-semibold ri-arrow-left-line"></i>
            <h1 className='text-3xl font-semibold'>People</h1>
          </div>
    
          <div className='w-[90%] flex items-center '>
            <Topnav />
            <Dropdown title="Category" options={['popular']} funct={(e)=> setCategory(e.target.value)} />
            <div className='w-[2%]'></div>
          </div>
          </div>
    
          <InfiniteScroll
          dataLength={person.length}
          next={GetPerson()}
          hasMore={hasMore}
          loader={<h1>Loading</h1>}
          >
            
          <Cards data={person} title='person' />
    
          </InfiniteScroll>
    
    
        </div>
      ) : <Loading />
}

export default People
