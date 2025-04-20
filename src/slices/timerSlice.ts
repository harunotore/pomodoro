import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface TimerState {
  timeInMinutes: number
  mode: string
  
}

const initialState: TimerState = {
  timeInMinutes: 25,
  mode: 'pomodoro'
}

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
      update: (state, action) => {
        state.timeInMinutes = action.payload
      },
    }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const {update} = timerSlice.actions
export default timerSlice.reducer