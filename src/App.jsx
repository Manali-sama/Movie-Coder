import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import Movie from './Components/Movie'
import TvShows from './Components/TvShows'
import People from './Components/People'
import Moviedetails from './Components/Moviedetails'
import Tvdetails from './Components/Tvdetails'
import Peopledetails from './Components/Peopledetails'
import Trailers from './Partials/Trailers'

function App() {
  return (
    <div className='w-screen h-screen overflow-x-hidden flex bg-[#1F1E24]'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<Moviedetails />}>
          <Route path='/movie/details/:id/trailer' element={<Trailers />} />
        </Route>
        <Route path='/tv' element={<TvShows />} />
        <Route path='/tv/details/:id' element={<Tvdetails />}>
        <Route path='/tv/details/:id/trailer' element={<Trailers />} />
        </Route>
        <Route path='/person' element={<People />} />
        <Route path='/person/details/:id' element={<Peopledetails />} />
      </Routes>
    </div>
  )
}

export default App
