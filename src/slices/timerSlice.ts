import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export enum modeTypes {
  pomodoroMode = 'pomodoro',
  shortBreakMode = 'short break',
  longBreakMode = 'long break'
}

export interface TimerState {
  pomodoroTimeInMinutes: number
  shortBreakTimeInMinutes: number
  longBreakTimeInMinutes: number
  mode: modeTypes
  autoStart: boolean
  timeLeft: number
  isActive: boolean
}

const pomodoroTimeInMinutes = 25
const initialPomodoro = pomodoroTimeInMinutes * 60 * 1000

const initialState: TimerState = {
  pomodoroTimeInMinutes: pomodoroTimeInMinutes,
  shortBreakTimeInMinutes: 5,
  longBreakTimeInMinutes: 10,
  autoStart: false,
  mode: modeTypes.pomodoroMode,
  timeLeft: initialPomodoro,
  isActive: false,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateMode: (state, action) => {
      state.mode = action.payload
    },
    updateTimeLeft: (state, action) => {
      state.timeLeft = action.payload
    },
    updatePomodoroTime: (state, action: PayloadAction<number>) => {
      state.pomodoroTimeInMinutes = action.payload
    },
    updateShortBreakTime: (state, action: PayloadAction<number>) => {
      state.shortBreakTimeInMinutes = action.payload
    },
    updateLongBreakTime: (state, action: PayloadAction<number>) => {
      state.longBreakTimeInMinutes = action.payload
    },
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { updateTimeLeft, updateMode, updatePomodoroTime, updateShortBreakTime, updateLongBreakTime } = timerSlice.actions
export default timerSlice.reducer