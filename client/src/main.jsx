import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import App from "./App";
import "./styles.css";
// TODO (Task 7.4 BONUS): import { setUnauthorisedHandler } from "./api/axios";
// TODO (Task 7.4 BONUS): setUnauthorisedHandler(() => store.dispatch(forceLogout()));

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
