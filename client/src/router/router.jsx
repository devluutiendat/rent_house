
import { createBrowserRouter,Outlet } from "react-router-dom";
import ErrorPage from "./errorRouter";
import Login from "../page/login";
import Home from "../page/home";
import Protected from "./protected";
import Detail from "../page/details";
import User from "../page/user";
import Agent from "../page/Agent";
const AuthLayout = () => {
    return <Outlet/>
}

export default createBrowserRouter([
    {
        element:<AuthLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                element:<Login/>,
                path:'/login',
            },
            {
                element:<Protected/>,
                children:[
                    {
                        element:<Home/>,
                        path:'/',
                    },
                    {
                        element:<Home/>,
                        path:'/search'
                    },
                    {
                        element: <Detail />,
                        path: "/house/:id",
                    },
                    {
                        element:<User/>,
                        path:"/user"
                    },
                    {
                        element:<Agent/>,
                        path:"/agent"
                    }
                ]
            },
        ]
    }
])