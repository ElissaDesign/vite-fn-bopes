/* eslint-disable prefer-destructuring */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
console.log(BACKEND_URL);
const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
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
    inviteUser: builder.mutation({
      query: (user) => ({
        url: "/users/invite",
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
    signOut: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
    }),
    getUsers: builder.query({
      query: () => "/users",
    }),

    getUsersWithNoOrg: builder.query({
      query: () => "/users/nullid",
    }),

    // Requests
    getRequests: builder.query({
      query: () => "/requests",
    }),
    getRequest: builder.query({
      query: (requestId) => ({
        url: "/requests/request",
        body: requestId,
      }),
    }),
    createRequest: builder.mutation({
      query: (request) => ({
        url: "/requests",
        method: "POST",
        body: request,
      }),
    }),
    deleteRequest: builder.mutation({
      query: (requestId) => ({
        url: `/requests/request`,
        method: "DELETE",
        body: requestId,
      }),
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
  useSignOutMutation,
  useInviteUserMutation,
  useGetUsersQuery,
  useGetUsersWithNoOrgQuery,
  // Request Id
  useCreateRequestMutation,
  useGetRequestQuery,
  useGetRequestsQuery,
  useDeleteRequestMutation,
  // Organization
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
  useAssignOrganizationMutation,
} = apiSlice;