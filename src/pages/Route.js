import React, { useEffect } from 'react';
import LoginPage from './LoginPage';
import Browse from './Browse';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



const Route = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage />,
            errorElement: <div>Page Not Found</div>

        }, {
            path: "/browse",
            element: <Browse />,
            errorElement: <div>Page Not Found</div>
        }
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
};





export default Route;