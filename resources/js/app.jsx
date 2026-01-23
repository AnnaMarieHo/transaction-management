import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
// import store from "./store"
import { DataContext } from "./contexts/DataContext";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    // <React.StrictMode>
    // <Provider store={store}> 
        <DataContext>
            <App />
        </DataContext>
    // </Provider>
    // </React.StrictMode>
);
