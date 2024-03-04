import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./Styles/global.scss";
import { Provider } from "react-redux";
import Store from "./Redux/Store.ts";
import "./i18n";
import "./Styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={Store}>
      <App />
    </Provider>
);
