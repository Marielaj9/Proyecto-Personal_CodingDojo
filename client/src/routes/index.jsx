import { createBrowserRouter } from "react-router-dom";
import Ahorro from "../pages/Ahorro";
import { Balance } from "../pages/Balance";


import Gastos from "../pages/Gastos";
import { Header } from "../pages/Header";
import Ingresos from "../pages/Ingresos";
import LoginForm from "../pages/LoginForm";

import Register from "../pages/Register";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { WelcomePage } from "../pages/WelcomePage";




export default createBrowserRouter([
    {
        path: '/',
        element: <PrivateRouter > <Header /> </PrivateRouter>,
        children: [
            {
                path: '/ingresos',
                element: <Ingresos />
            },
            {
                path: '/gastos',
                element: <Gastos />
            },
            {
                path: '/ahorros',
                element: <Ahorro /> 
            },
            {
                path: '/balance',
                element: <Balance /> 
            },
            
        ]
    },
    {
        path: '/welcome',
        element: <PublicRouter><WelcomePage /></PublicRouter> 
    },
    {
        path: '/login',
        element: <PublicRouter><LoginForm /></PublicRouter> 
    },
    {
        path: '/register',
        element: <PublicRouter><Register /></PublicRouter> 
    },

]);