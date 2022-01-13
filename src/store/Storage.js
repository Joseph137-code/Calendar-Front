import { configureStore } from '@reduxjs/toolkit'
import counterReducer     from '../reducers/pruebaReducer'
import calendarSlice      from '../reducers/calendarReducer'
import authSlice          from '../reducers/authReducer'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    calendario: calendarSlice,
    auth: authSlice
  },
})
