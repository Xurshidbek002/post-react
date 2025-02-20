import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Category from "../Pages/Category";
import Login from "../Pages/Login";
import Brands from "../Pages/Brands";
import Location from "../Pages/Location";
import Sites from "../Pages/Sites";
import Model from "../Pages/Model";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <h1>Bunday sahifa mavjud emas</h1>,
    children: [
      {
        path: "/",
        element: <Category />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/brands",
        element: <Brands />,
      },
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/sites",
        element: <Sites />,
      },
      {
        path: "/model",
        element: <Model />,
      },
    ],
  },
]);
