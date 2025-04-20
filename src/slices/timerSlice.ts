import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState: CounterState = {
  value: 25,
}

export const counterSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        
    }
})