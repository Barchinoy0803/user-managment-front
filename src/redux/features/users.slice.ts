import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
    token: null | string
}

const initialState: UserState = {
    token: null
}

export const UsersState = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            localStorage.setItem("token", state.token)
        }
    },
})

export const { setToken } = UsersState.actions
export default UsersState.reducer
