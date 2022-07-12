import {createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'no notification',
    reducers: {
        setNotification(state, action) {
            state = action.payload
            return state
        }
    }
})

export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer