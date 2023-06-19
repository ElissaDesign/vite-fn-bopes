/* eslint-disable prefer-destructuring */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const getToken = () => localStorage.getItem("auth_token");

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
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

    getAllUsersWithDepartments: builder.query({
      query: () => "/users/employees",
    }),

    getAllDepartmentsUserHave: builder.query({
      query: () => "/users/departments",
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
    // customers
    getOrganizationOwned: builder.query({
      query: () => "/organizations/customers",
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
    registerOrganization: builder.mutation({
      query: (organization) => ({
        url: "/organizations/create",
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

    // Departments or services
    getDepartments: builder.query({
      query: () => "/departments",
    }),
    getDepartment: builder.query({
      query: (id) => `department/${id}`,
    }),
    createDepartment: builder.mutation({
      query: (name) => ({
        url: "/departments",
        method: "POST",
        body: name,
      }),
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `departments/${id}`,
        method: "DELETE",
      }),
    }),
    updateDepartment: builder.mutation({
      query: (department) => ({
        url: `departments`,
        method: "PATCH",
        body: department,
      }),
    }),
    assignDepartment: builder.mutation({
      query: (department) => ({
        url: "/users/assigndepartment",
        method: "PATCH",
        body: department,
      }),
    }),

    // Products services
    getProducts: builder.query({
      query: (departmentId) => `/products/products/${departmentId}`,
    }),
    getProduct: builder.query({
      query: (productId) => `/products/${productId}`,
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: (args) => {
        const { productId, product } = args;
        return {
          url: `/products/${productId}`,
          method: "PATCH",
          body: product,
        };
      },
    }),

    // Transations
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),
    }),
    getEmployeeTransations: builder.query({
      query: () => `/transactions/transactions`,
    }),
    updateTransaction: builder.mutation({
      query: (args) => {
        const { transactionId, transaction } = args;
        return {
          url: `/transactions/${transactionId}`,
          method: "PATCH",
          body: transaction,
        };
      },
    }),
  }),
  refetchOnMountOrArgChange: 5_000,
});
export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useCurrentUserQuery,
  useSignOutMutation,
  useInviteUserMutation,
  useGetUsersQuery,
  useGetUsersWithNoOrgQuery,
  useGetAllUsersWithDepartmentsQuery,
  useGetAllDepartmentsUserHaveQuery,
  // Request Id
  useCreateRequestMutation,
  useGetRequestQuery,
  useGetRequestsQuery,
  useDeleteRequestMutation,
  // Organization
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useGetOrganizationOwnedQuery,
  useCreateOrganizationMutation,
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
  useAssignOrganizationMutation,
  useRegisterOrganizationMutation,
  // Departments
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
  useAssignDepartmentMutation,

  // Products
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,

  // Transactions
  useGetEmployeeTransationsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} = apiSlice;
