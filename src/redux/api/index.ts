import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
    reducerPath: "mainApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://user-managment-project.onrender.com",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: () => ({}),
    tagTypes: ['USER']
})  