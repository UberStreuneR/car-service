import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const ordersAdapter = createEntityAdapter();
export const initialState = ordersAdapter.getInitialState();

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
});

// export const { addTasks, removeTask, doNothing } = orderSlice.actions;
export default orderSlice.reducer;

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/orders",
      transformResponse: (responseData) => {
        const updatedData = responseData.map((order) => {
          const orderPrice = order.tasks.reduce(
            (prevValue, currentTask) => prevValue + currentTask.cost,
            0
          );
          return { ...order, price: orderPrice };
        });
        return ordersAdapter.setAll(initialState, updatedData);
      },
      providesTags: (result, error, arg) => [
        "Orders",
        ...result["ids"].map(({ id }) => ({ type: "Orders", id: arg })),
      ],
    }),
    getOrdersByClientId: builder.query({
      query: (clientId) => `/orders/byClientId/${clientId}`,
      transformResponse: (responseData) => {
        return ordersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        ...result["ids"].map(({ id }) => ({ type: "Orders", id: arg })),
      ],
    }),
    getOrder: builder.query({
      query: (taskId) => `/orders/${taskId}`,
      providesTags: (result, error, arg) => [{ Type: "Orders", id: arg }],
    }),
    addOrder: builder.mutation({
      query: ({ taskIds, client }) => {
        return {
          url: `orders/addNewOrderForClientId/${client.id}`,
          method: "POST",
          body: taskIds,
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrdersByClientIdQuery,
  useGetOrderQuery,
  useAddOrderMutation,
} = orderApiSlice;

export const selectOrdersResult = orderApiSlice.endpoints.getOrders.select();
export const selectOrdersResultData = createSelector(
  selectOrdersResult,
  (result) => result.data ?? []
);

export const { selectAll: selectAllOrders, selectById } =
  ordersAdapter.getSelectors(
    (state) => selectOrdersResultData(state) ?? initialState
  );

export const selectOrdersForClientId = createSelector(
  [selectAllOrders, (state, clientId) => clientId],
  (orders, clientId) => {
    return orders.filter((order) => order.client.id === clientId) ?? null;
  }
);

//
// // export const selectOrdersForClientResult =
// //   orderApiSlice.endpoints.getOrdersByClientId.select();
// export const selectOrdersForClientResult = createSelector();
// export const selectOrdersForClientResultData = createSelector(
//   selectOrdersForClientResult,
//   (result) => result.data ?? []
// );
