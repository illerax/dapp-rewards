import {configureStore} from '@reduxjs/toolkit'
import backdropReducer from './backdropSlice'
import modalReducer from './modalSlice'

export default configureStore({
    reducer: {
        backdrop: backdropReducer,
        modal: modalReducer,
    },
})