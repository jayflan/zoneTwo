import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";

//test
import { Provider } from "react-redux";
import store from "../client/_store";


const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  );