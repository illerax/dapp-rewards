import {createSlice} from '@reduxjs/toolkit'

export const backdropSlice = createSlice({
    name: 'backdrop',
    initialState: {
        isOpened: false,
    },
    reducers: {
        close: (state) => {
            state.isOpened = false;
        },
        open: (state) => {
            state.isOpened = true;
        },
    },
})

export const {open, close} = backdropSlice.actions

export default backdropSlice.reducer