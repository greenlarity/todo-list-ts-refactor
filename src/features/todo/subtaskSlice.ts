import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SubtaskState } from '../../types';
import { RootState } from '../../store/store';

const initialState: SubtaskState = {
    taskValue: '',
}


export const subtask = createSlice({
    name: 'subtask',
    initialState: initialState,
    reducers: {
        setTaskValue(state, action: PayloadAction<string>) {
            state.taskValue = action.payload;
        },
    },

});

export const { setTaskValue} = subtask.actions
export const selectTask = (state: RootState) => state.subtask.taskValue;
export default subtask.reducer