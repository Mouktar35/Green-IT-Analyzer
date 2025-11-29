import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";

import HomePage from "./pages/Home";
import AnalyzerPage from "./pages/Analyzer";
import NotFoundPage from "./pages/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/analyzer", element: <AnalyzerPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
