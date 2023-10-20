import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './reducers/commonSlice'


export default configureStore({
  reducer: {
    common : commonSlice
  },
})