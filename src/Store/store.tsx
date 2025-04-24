import {configureStore} from "@reduxjs/toolkit"
import counterSlice from './Slices/Counter'
import Counter from "./Slices/Counter"
export const store = configureStore({
    reducer:{
        counter:counterSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

