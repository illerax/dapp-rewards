import {createSlice} from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpened: false,
        text: "",
    },
    reducers: {
        close: (state) => {
            state.isOpened = false;
        },
        open: (state, action) => {
            state.isOpened = true;
            state.text = action.payload;
        },
    },
})

export const {open, close} = modalSlice.actions

export default modalSlice.reducer