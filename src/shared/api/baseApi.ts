import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as {
                auth: {
                    accessToken: string | null;
                };
            };

            if (state.auth.accessToken) {
                headers.set(
                    'authorization',
                    `Bearer ${state.auth.accessToken}`
                );
            }

            return headers;
        },
    }),
    endpoints: () => ({

    })
})