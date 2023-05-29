/* eslint-disable prefer-destructuring */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  fetchFn: (url, config) => fetch(url, { ...config, credentials: "include" }),
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    userLogin: builder.mutation({
      query: (user) => ({
        url: "/auth/signin",
        method: "POST",
        body: user,
      }),
    }),
    currentUser: builder.query({
      query: () => "/auth/currentuser",
    }),
  }),
});
export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useCurrentUserQuery,
} = apiSlice;
