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
            })
        }) 
    }),
    overrideExisting: false
})

export const {useGetUsersQuery, useLoginMutation, useRegisterMutation} = extendedApi