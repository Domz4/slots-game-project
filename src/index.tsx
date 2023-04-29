import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { Game } from "./pages/Games/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
]);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <Game /> */}
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
