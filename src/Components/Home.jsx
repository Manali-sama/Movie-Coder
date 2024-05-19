import React, { useEffect, useState } from 'react'
import Sidenav from '../Partials/Sidenav'
import Topnav from '../Partials/Topnav'
import axios from '../Utils/axios'
import Header from '../Partials/Header'
import HorizontalCards from '../Partials/HorizontalCards'
import Dropdown from '../Partials/Dropdown'
import Loading from './Loading'

function Home() {
    document.title = "Movie App | Home"

    const [wallpaper, setWallpaper] = useState("")
    const [cards, setCards] = useState("")
    const [category, setCategory] = useState('all')
    
    const GetHeaderWallpaper = async ()=> {
      try {
        const {data} = await axios.get(`/trending/all/week`)
        let randomdata = data.results[(Math.random()*data.results.length).toFixed()]
        setWallpaper(randomdata)
      } catch (error) {
        console.log("Error:",error)
      }
    }


    const GetCards = async ()=> {
      try {
        const {data} = await axios.get(`/trending/${category}/week`)
        
        setCards(data.results)
      } catch (error) {
        console.log("Error:",error)
      }
    }
    

    useEffect(()=>{
      GetCards()
      !wallpaper && GetHeaderWallpaper()
    },[category])

  


  return wallpaper ? (
    <>
      <Sidenav />
      <div className='w-[80%] h-full overflow-auto overflow-x-hidden '>
        <Topnav />
        <Header data={wallpaper} />

        <div className=' flex justify-between p-5'>
        <h1 className='text-zinc-200 text-2xl font-semibold '>Trendings</h1>
        <Dropdown title="Filter" options={['tv', 'movie', 'all']} 
        funct ={(e)=> setCategory(e.target.value)} />
        </div>
        <HorizontalCards cards={cards} />
      </div>
    </>
  ) : <Loading />
}

export default Home
