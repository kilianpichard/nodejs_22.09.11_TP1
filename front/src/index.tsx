import React from "react";
import ReactDOM from "react-dom/client";
import App from "./views/App";
import { Header } from "./components/Header";
import "./style.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>
);
