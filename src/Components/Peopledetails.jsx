import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {asyncloadpeople, removepeople} from '../store/Actions/peopleAction'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading'
import HorizontalCards from '../Partials/HorizontalCards'
import Dropdown from '../Partials/Dropdown'

function Peopledetails() {
  const [category, setcategory] = useState('movie')
  const {pathname} = useLocation()
  const {info} = useSelector(state => state.people)
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(asyncloadpeople(id))
    return () =>{
      dispatch(removepeople())
    }
  }, [id])
  return info ?(
    <div className='w-screen h-[160vh] px-[15%]'>
      <nav className='w-full h-[10vh] text-white py-5'>
        <Link>
        <i onClick={()=> navigate(-1)} className="text-3xl font-semibold ri-arrow-left-line"></i>
        </Link></nav>
      <div className='w-full flex '>
      <div className='w-[20%]'>
      <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover w-[26vh] h-[40vh]"
            src={info.detail.profile_path ?`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path
            }`: `https://st2.depositphotos.com/2102215/46681/v/450/depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg`}
            alt=""
          />
          <hr className="h-[1.5px] border-none bg-zinc-500 mb-2 mt-3" />
          <div className='text-xl text-zinc-500  flex gap-5'>
          <a href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
        <i className="ri-earth-fill hover:text-white"></i>
        </a>
          <a href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
        <i className="ri-facebook-circle-fill hover:text-white"></i>
        </a>
          <a href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
        <i className="ri-instagram-fill hover:text-white"></i>
        </a>
          <a href={`https://www.twitter.com/${info.externalid.twitter_id}`}>
        <i className="ri-twitter-x-fill hover:text-white"></i>
        </a>
          </div>
          <h1 className='text-xl text-zinc-500 py-3 font-semibold'>Personal info</h1>

          <h1 className='text-md text-zinc-500 font-semibold'>Known For</h1>
          <h1 className='text-sm pb-2 text-zinc-500 font-semibold'>{info.detail.known_for_department}</h1>
          <h1 className='text-md text-zinc-500 font-semibold'>Birthdate</h1>
          <h1 className='text-sm pb-2 text-zinc-500 font-semibold'>{info.detail.birthday}</h1>
          {info.detail.deathday === null ? '' : 
         <> <h1 className='text-md text-zinc-500 font-semibold'>Deathdate</h1>
          <h1 className='text-sm pb-2 text-zinc-500 font-semibold'>{info.detail.deathday}</h1></>}
          {info.detail.place_of_birth === null ? '' : 
         <> <h1 className='text-md text-zinc-500 font-semibold'>Birthplace</h1>
          <h1 className='text-sm pb-2 text-zinc-500 font-semibold'>{info.detail.place_of_birth}</h1></>}
          <h1 className='text-md text-zinc-500 font-semibold'>Gender</h1>
          <h1 className='text-sm pb-2 text-zinc-500 font-semibold'>{info.detail.gender === 2 ? "Male" : "Female"}</h1>
          
          
      </div>
      <div className='w-[80%] ml-5'>
      <h1 className='text-5xl pb-2 text-zinc-500 font-semibold'>{info.detail.name}</h1>
      <h1 className='text-xl mb-3 text-zinc-500 font-semibold'>Biography</h1>
      <p className='text-sm pb-2 text-zinc-500 font-semibold'>{info.detail.biography}</p>
      <h1 className='text-lg text-zinc-500 my-5 font-semibold'>Known For</h1>
      <HorizontalCards cards={info.combined_credits.cast} />
      <div className='w-full flex justify-between'>
      <h1 className='text-xl mt-5 text-zinc-500 font-semibold'>Acting</h1>
      <Dropdown title="Category" options={['tv', 'movie']} funct={(e) =>setcategory(e.target.value)} />
      </div>
      <div className='list-disc w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] p-3 border-2 border-zinc-700'>

        {info[category+'_credits'].cast.map((c,i) =>
        <li className='hover:text-white text-zinc-500 p-5 hover:bg-[#19191d] duration-300 cursor-pointer'>
        <Link to={`/${category}/details/${c.id}`}>
        <span className='text-lg font-semibold'>{""}
        {c.title || c.name || c.original_name || c.original_title}
        </span>
        <span className='block ml-6 text-md'>{c.character && `Character Name: ${c.character}`}</span>
        </Link>
      </li>
         )}

        
      </div>
      </div>
      </div>
    </div>
  ) : <Loading />
}

export default Peopledetails
