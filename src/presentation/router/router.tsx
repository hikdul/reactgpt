import { Navigate, createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { menuRoutes } from "./menuRouters";

export const router = createBrowserRouter([{
    path: "/",
    element: <DashboardLayout />,
    children: [
        ...menuRoutes.map(r => ({
            path: r.to,
            element: r.component
        })),
    {
        path: '',
        element: <Navigate to={menuRoutes[0].to}/>
    }]
}])
