import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CalendarApp from "./CalendarApp";
import "./index.css";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CalendarApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
