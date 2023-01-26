import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { ISignUpBody, ISignUpResponse } from '@Rtk';
import { endpoints } from '@Endpoints';

const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.users,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      token && headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ['users'],

  endpoints: (builder) => ({
    getUsers: builder.query<ISignUpResponse[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['users'],
    }),

    getUser: builder.query<ISignUpResponse, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['users'],
    }),

    editUser: builder.mutation<ISignUpResponse, { id: string; body: ISignUpBody }>({
      query: ({ id, body }) => {
        return { url: `/${id}`, method: 'PUT', body };
      },
      invalidatesTags: ['users'],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
  }),
});

export { usersApi };
export const { useEditUserMutation, useDeleteUserMutation, useGetUsersQuery, useGetUserQuery } =
  usersApi;
