import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";

import App from "./App";
import { TopicProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TopicProvider>
      <App />
    </TopicProvider>
  </React.StrictMode>
);
