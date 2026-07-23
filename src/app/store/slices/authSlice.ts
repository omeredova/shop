import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from '@/pages/Auth';

interface AuthState {
    user: LoginResponse | null;
}


const initialState: AuthState = {
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<LoginResponse>) {
            state.user = {
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                image: action.payload.image,
                accessToken: action.payload.accessToken,
            }
        },
        logout(state){
            state.user = null;
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;