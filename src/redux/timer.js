// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

const initialData = () => {
  const item = window.localStorage.getItem('timerData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : []
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState: initialData(),
  reducers: {
    handleTimer: (state, action) => {
      const data = [
        ...state,
        {
          title: action.payload.title,
          timer: action.payload.timer
        }
      ]

      localStorage.setItem('timerData', JSON.stringify(data))
      return data
    },

    removeTimer: (_state, action) => {
      localStorage.setItem('timerData', JSON.stringify(action.payload))
      return action.payload
    }
  }
})

export const { handleTimer, removeTimer } = timerSlice.actions

export default timerSlice.reducer
