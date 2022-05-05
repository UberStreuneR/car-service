import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const tasksAdapter = createEntityAdapter();
export const initialState = tasksAdapter.getInitialState();
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks: (state, action) => {
      tasksAdapter.addMany(state, action.payload);
    },
    removeTask: (state, id) => {
      tasksAdapter.removeOne(state, id);
    },
    removeAllTasks: (state) => {
      tasksAdapter.removeAll(state);
    },
  },
});

export const { addTasks, removeTask, removeAllTasks } = tasksSlice.actions;
export const { selectAll: selectAddedTasks } = tasksAdapter.getSelectors(
  (state) => state.tasks
);

export default tasksSlice.reducer;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      transformResponse: (responseData) => {
        return tasksAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        "Tasks",
        ...result["ids"].map(({ id }) => ({ type: "Tasks", id: arg })),
      ],
    }),

    getTask: builder.query({
      query: (taskId) => `/tasks/${taskId}`,
      providesTags: (result, error, arg) => [{ Type: "Tasks", id: arg }],
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskQuery } = extendedApiSlice;
export const selectTasksResult = extendedApiSlice.endpoints.getTasks.select();
export const selectTasksResultData = createSelector(
  selectTasksResult,
  (result) => result.data ?? []
);
