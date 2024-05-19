import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './Reducers/movieSlice'
import tvReducer from './Reducers/tvSlice'
import peopleReducer from './Reducers/peopleSlice'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    people: peopleReducer
  },
})
