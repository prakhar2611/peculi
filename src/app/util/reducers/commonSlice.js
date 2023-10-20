import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
        labels : [],
        pockets : [{
            name :"" ,
            labels : []
        }]
    },
  reducers: {
    setlabels: (state, action) => {
      state.labels = action.payload
         //pushing it to db using api call   
    },
    setpockets: (state, action) => {
        const pocket = {
            name : action.payload.name,
            labels : action.payload.labels
        }
        state.pockets.push(pocket)
        //pushing it to db using api call   
    }
  },
})

// Action creators are generated for each case reducer function
export const { setlabels,setpockets } = commonSlice.actions

export default commonSlice.reducer