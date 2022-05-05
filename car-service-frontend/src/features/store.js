import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import clientsReducer from "./clients/clientsSlice";
import orderReducer from "./orders/orderSlice";
import tasksReducer from "./tasks/tasksSlice";
export default configureStore({
  reducer: {
    order: orderReducer,
    tasks: tasksReducer,
    client: clientsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
