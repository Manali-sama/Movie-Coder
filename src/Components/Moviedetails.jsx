import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadmovie, removemovie } from '../store/Actions/movieAction'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading'
import HorizontalCards from '../Partials/HorizontalCards'

function Moviedetails() {
  const {pathname} = useLocation()
  const {info} = useSelector(state => state.movie)
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(asyncloadmovie(id))
    return () =>{
      dispatch(removemovie())
    }
  }, [id])
  return info ? (
    <div
     style={{background: `linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.4),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
    backgroundSize: `cover`,
    backgroundPosition: `top[30%]`
}}
    className='w-screen h-[140vh] px-[10%] relative'>

      <nav className='w-full flex items-center h-[8vh] text-white text-xl gap-8'>
        <Link>
        <i onClick={()=> navigate(-1)} className="text-3xl font-semibold ri-arrow-left-line"></i>
        </Link>
        <a href={info.detail.homepage}>
        <i className="ri-external-link-line"></i>
        </a>
        <a href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
        <i className="ri-earth-fill"></i>
        </a>
        <a href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>
          <div className="font-black tracking-tight text-black flex justify-center items-center h-8 w-16 rounded-md bg-yellow-400">
            IMDb
          </div>
        </a>
      </nav>


      <div className='w-full flex mt-[5%] gap-10'>
      <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover w-[36vh] h-[50vh]"
            src={info.detail.poster_path || info.detail.backdrop_path ?`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }` : `https://st2.depositphotos.com/2102215/46681/v/450/depositphotos_466819550-stock-illustration-image-available-icon-missing-image.jpg`}
            alt=""
          />
          <div>
          <h1 className=' text-3xl text-white font-bold'>
            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
            <small className='text-xl ml-2'>({info.detail.release_date.split("-")[0]})</small>
            </h1>

            <div className='flex flex-col text-white text-xl mt-3'>
            {info.detail.vote_average && (
            <div className='flex items-center gap-2'>
              <div className="w-[5vh] h-[5vh] rounded-full bg-yellow-400 flex justify-center items-center text-lg font-semibold text-white">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup> 
            </div>
            <h1 className='font-semibold '>User Score</h1>
            </div>
          )}
            
          <h1>Release Date: {info.detail.release_date}</h1>
          <h1>Genre: {info.detail.genres.map((g)=> g.name).join(" , ")}</h1>
          <h1>Duration: {info.detail.runtime}min</h1>
          <h1>Language: {info.detail.spoken_languages.map((l)=> l.english_name).join(" | ")}</h1>
            </div>

            <h1 className='text-xl text-white'>Overview</h1>
            <p className='text-sm text-white mb-5'>{info.detail.overview}</p>
            <Link to={`${pathname}/trailer`}
            style={{
              background: `linear-gradient(rgba(25,2,255,0.2),rgba(0,150,200,0.5),rgba(20,200,255,.8))`,
            }} 
            className='p-3 text-white rounded mt-2'>Watch Trailer</Link>
          </div>
      </div>

      <div className='w-[80%]'>
        <div className='mt-5 flex gap-4 items-center'>
          {info.watchproviders && info.watchproviders.flatrate && <h1 className='text-white text-xl'>Flatrate Links:</h1>}
        {info.watchproviders &&
        info.watchproviders.flatrate &&
        info.watchproviders.flatrate.map((x) => (
          <img
          className="w-[5vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover h-[5vh]"
          src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
          alt=""
        /> 
        ))}
        </div>
        <div className='mt-5 flex gap-4 items-center'>
        {info.watchproviders && info.watchproviders.rent && <h1 className='text-white text-xl'>Rent Links:</h1>}
        {info.watchproviders &&
        info.watchproviders.rent &&
        info.watchproviders.rent.map((x) => (
          <img
          className="w-[5vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover h-[5vh]"
          src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
          alt=""
        /> 
        ))}
        </div>

        <div className='mt-5 flex gap-4 items-center'>
        {info.watchproviders && info.watchproviders.buy && <h1 className='text-white text-xl'>Buy Links:</h1>}
        {info.watchproviders &&
        info.watchproviders.buy &&
        info.watchproviders.buy.map((x) => (
          <img
          className="w-[5vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover h-[5vh]"
          src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
          alt=""
        /> 
        ))}
        </div>
        
      </div>

      <h1 className='text-2xl font-semibold text-white mt-[5%] mb-2 ml-[1%]'>Recommendations</h1>
      <HorizontalCards cards={info.recommendations.length>0 ?  info.recommendations : info.similar} />
      <Outlet />
    </div>
  ) : <Loading />
}

export default Moviedetails
