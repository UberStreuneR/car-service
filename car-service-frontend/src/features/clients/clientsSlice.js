import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const clientsAdapter = createEntityAdapter();
// export const initialState = clientsAdapter.getInitialState();
const initialState = null;
export const clientsSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    addClient: (state, action) => {
      return action.payload;
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(useAddClientMutation.fulfilled, clientsAdapter.upsertOne);
  // },
});

export const { addClient } = clientsSlice.actions;
export default clientsSlice.reducer;

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => "/clients",
      transformResponse: (responseData) => {
        return clientsAdapter.setAll(
          clientsAdapter.getInitialState(),
          responseData
        );
      },
      providesTags: (result, error, arg) => [
        "Clients",
        ...result["ids"].map(({ id }) => ({ type: "Clients", id: arg })),
      ],
    }),
    getClient: builder.query({
      query: (clientId) => `/clients/${clientId}`,
      providesTags: (result, error, arg) => [{ Type: "Clients", id: arg }],
    }),
    addClient: builder.mutation({
      query: (client) => {
        return {
          url: "clients",
          method: "POST",
          body: client,
        };
      },
      invalidatesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: (client) => {
        return {
          url: `clients/update/${client.id}`,
          method: "PUT",
          body: client,
        };
      },
      invalidatesTags: (result, error, arg) => [
        "Clients",
        { Type: "Clients", id: arg },
      ],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  // useGetClientByEmailQuery,
  useAddClientMutation,
  useUpdateClientMutation,
} = clientsApiSlice;
export const selectClientsResult =
  clientsApiSlice.endpoints.getClients.select();
export const selectClientsResultData = createSelector(
  selectClientsResult,
  (result) => result.data ?? []
);
export const { selectAll: selectAllClients } = clientsAdapter.getSelectors(
  (state) => {
    return selectClientsResultData(state) ?? clientsAdapter.getInitialState();
  }
);
export const selectClientByEmail = createSelector(
  [selectAllClients, (state, email) => email],
  (clients, email) => {
    return clients.find((client) => client.email === email) ?? null;
  }
);
