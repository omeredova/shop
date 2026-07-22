import { baseApi } from "@/shared";
import { LoginRequest, LoginResponse } from "@/pages/Auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            })
        })
    })
})

export const { useLoginMutation } = authApi;