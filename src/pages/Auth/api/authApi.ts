import { baseApi } from '@/shared';
import type { LoginAuthResponse, LoginRequest } from '../types/auth.types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginAuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            })
        })
    })
})

export const { useLoginMutation } = authApi;