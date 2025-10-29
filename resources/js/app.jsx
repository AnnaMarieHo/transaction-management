import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ReceiptProvider } from "./contexts/ReceiptContext";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    // <React.StrictMode>
    <ReceiptProvider>
        <App />
    </ReceiptProvider>
    // </React.StrictMode>
);
