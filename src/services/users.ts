// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { user } from "../types/users";

// Define a service using a base URL and expected endpoints
export const jsonplaceholderApi = createApi({
  reducerPath: "jsonplaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.query<user[], void>({
      query: () => `/users`,
      // providesTags: ["users"],
    }),
    addUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `users`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["users"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useAddUserMutation } = jsonplaceholderApi;
