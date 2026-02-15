import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import store from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
);
