import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface TimerState {
  timeInMinutes: number
  pomodoroTimeInMinutes: number
  shortBreakTimeInMinutes: number
  longBreakTimeInMinutes: number
  mode: string

}

const initialState: TimerState = {
  timeInMinutes: 25,
  pomodoroTimeInMinutes: 25,
  shortBreakTimeInMinutes: 5,
  longBreakTimeInMinutes: 10,
  mode: 'pomodoro'
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    update: (state, action) => {
      state.timeInMinutes = action.payload
    },
    updateMode: (state, action) => {
      state.mode = action.payload
    }
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { update, updateMode } = timerSlice.actions
export default timerSlice.reducer