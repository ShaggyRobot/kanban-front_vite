import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICreateBoardBody,
  IBoardFaceDTO,
  IBoardDTO,
  IColumn,
  ICreateTaskBody,
  ITaskUpdate,
  IColumnUpdate,
  IUpdateBoardBody,
} from '@Rtk';

import { endpoints } from '@Endpoints';

const boardsApi = createApi({
  reducerPath: 'boardsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.boards,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      token && headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ['boards', 'board'],

  endpoints: (builder) => ({
    getBoards: builder.query<IBoardFaceDTO[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['boards'],
    }),

    getBoard: builder.query<IBoardDTO, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['board'],
    }),

    createBoard: builder.mutation<IBoardFaceDTO, ICreateBoardBody>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['boards'],
    }),

    updateBoard: builder.mutation<IBoardFaceDTO, { boardId: string; body: IUpdateBoardBody }>({
      query: (arg) => {
        const { boardId, body } = arg;
        return {
          url: `/${boardId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['board', 'boards'],
    }),

    deleteBoard: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['boards'],
    }),

    createColumn: builder.mutation<IColumn, { boardId: string; title: string }>({
      query: (arg) => {
        const { boardId, title } = arg;
        return {
          url: `/${boardId}/columns`,
          method: 'POST',
          body: {
            title,
          },
        };
      },
      invalidatesTags: ['board'],
    }),

    updateColumn: builder.mutation<
      IColumnUpdate,
      { boardId: string; columnId: string; body: { title: string; order: number } }
    >({
      query: (args) => {
        const { boardId, columnId, body } = args;
        return {
          url: `/${boardId}/columns/${columnId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['board'],
    }),

    deleteColumn: builder.mutation<void, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => {
        return {
          url: `/${boardId}/columns/${columnId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['board'],
    }),

    createTask: builder.mutation<
      void,
      { boardId: string; columnId: string; body: ICreateTaskBody }
    >({
      query: ({ boardId, columnId, body }) => {
        return {
          url: `/${boardId}/columns/${columnId}/tasks`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['board'],
    }),

    updateTask: builder.mutation<
      void,
      { boardId: string; columnId: string; taskId: string; body: ITaskUpdate }
    >({
      query: ({ boardId, columnId, taskId, body }) => {
        return {
          url: `/${boardId}/columns/${columnId}/tasks/${taskId}`,
          method: 'PUT',
          body,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(boardsApi.util.invalidateTags(['board']));
        } catch (error) {
          return;
        }
      },
    }),

    deleteTask: builder.mutation<void, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => {
        return {
          url: `/${boardId}/columns/${columnId}/tasks/${taskId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['board'],
    }),
  }),
});

export { boardsApi };

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useDeleteColumnMutation,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = boardsApi;
