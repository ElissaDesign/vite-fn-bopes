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

    // Organization
    getOrganizations: builder.query({
      query: () => "/organizations",
    }),
    getOrganization: builder.query({
      query: (id) => `organizations/${id}`,
    }),
    createOrganization: builder.mutation({
      query: (organization) => ({
        url: "/organizations",
        method: "POST",
        body: organization,
      }),
    }),
    deleteOrganization: builder.mutation({
      query: (id) => ({
        url: `organization/${id}`,
        method: "DELETE",
      }),
    }),
    updateOrganization: builder.mutation({
      query: (organization) => ({
        url: `organization`,
        method: "PATCH",
        body: organization,
      }),
    }),
    assignOrganization: builder.mutation({
      query: ({ userId, orgId }) => ({
        url: `/users/${userId}/${orgId}`,
        method: "PATCH",
      }),
    }),
  }),
});
export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useCurrentUserQuery,
  // Organization
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
  useAssignOrganizationMutation,
} = apiSlice;
