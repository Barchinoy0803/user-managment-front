import { mainApi } from ".";
import { Login, Register } from "../../types/api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: (params) => ({
                method: "GET",
                url: "/user",
                params
            }),
            providesTags: ['USER']
        }),
        register: build.mutation<Register['Response'], Register['Request']>({
            query: (body) => ({
                method: "POST",
                url: "/user/register",
                body
            }),
        }),
        login: build.mutation<Login['Response'], Login['Request']>({
            query: (body) => ({
                method: "POST",
                url: "/user/login",
                body
            }),
            invalidatesTags: ['USER']
        }),
        deleteUsers: build.mutation({
            query: (body) => ({
                method: "DELETE",
                url: "/user",
                body
            }),
            invalidatesTags: ['USER']
        }),
        updateUserStatus: build.mutation({
            query: (body) => ({
                method: "PATCH",
                url: "/user/update-status",
                body
            }),
            invalidatesTags: ['USER']
        }),
    }),
    overrideExisting: false 
})

export const { useGetUsersQuery, useLoginMutation, useRegisterMutation, useDeleteUsersMutation, useUpdateUserStatusMutation } = extendedApi