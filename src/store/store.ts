import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todo/todoSlice";
import subtaskSlice from '../features/todo/subtaskSlice';



export const store = configureStore({
    reducer: {
        todo: todoSlice,
        subtask: subtaskSlice, 
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch