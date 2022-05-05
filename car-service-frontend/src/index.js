import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./features/store";
import { Provider } from "react-redux";
import { extendedApiSlice } from "./features/tasks/tasksSlice";
import { orderApiSlice } from "./features/orders/orderSlice";
import { clientsApiSlice } from "./features/clients/clientsSlice";
async function start() {
  await store.dispatch(extendedApiSlice.endpoints.getTasks.initiate());
  await store.dispatch(orderApiSlice.endpoints.getOrders.initiate());
  await store.dispatch(orderApiSlice.endpoints.getOrdersByClientId.initiate(1));
  // await store.dispatch(clientsApiSlice.endpoints.getClients.initiate());
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

start();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
