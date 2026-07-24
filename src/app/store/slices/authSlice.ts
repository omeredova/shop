import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginAuthResponse, LoginResponse } from '@/pages/Auth';

interface AuthState {
    user: LoginResponse | null;
    accessToken: string | null;
    initialized: boolean;
}


const initialState: AuthState = {
    user: null,
    accessToken: null,
    initialized: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<LoginAuthResponse>) {
            state.user = {
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                gender: action.payload.gender,
                image: action.payload.image,
            }
            state.accessToken = action.payload.accessToken;
        },
        logout(state){
            state.user = null;
            state.accessToken = null;
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
