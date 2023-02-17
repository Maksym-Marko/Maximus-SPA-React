import { createBrowserRouter } from "react-router-dom"
import { useGetUserQuery } from "@/services/Auth"

// middlewares
import RequiresGuest from "@/router/middlewares/RequiresGuest"
import RequiresAuth from "@/router/middlewares/RequiresAuth"
import RequiresEmailVerification from "./middlewares/RequiresEmailVerification"

// Layouts
import DefaultLayout from "@/components/DefaultLayout"

// Pages
import NotFound from "@/pages/NotFound"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Logout from "@/components/Logout"
import Dashboard from "@/pages/Dashboard"
import VerifyEmail from "@/pages/VerifyEmail"
import VerifyEmailCheck from "@/pages/VerifyEmailCheck"

const router = createBrowserRouter( [
    {
      path: '/',
      element: <DefaultLayout />,
      // errorElement: <ErrorPage />,
      children: [

        // Guest area
        {
          element: <RequiresGuest />,
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'register',
              element: <Register />
            },            
          ]
        },

        // Auth area
        {
          element: <RequiresAuth />,
          children: [
            // Email verified area
            {
              element: <RequiresEmailVerification />,
              children: [                
                {
                  path: 'dashboard',
                  element: <Dashboard />
                },
              ]
            },

            {
              path: '/verify-email',
              element: <VerifyEmail />
            },
            {
              path: 'logout',
              element: <Logout />
            },          
          ]
        },

        // Common pages
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />,
        },
        // Email verification Check
        {
          path: '/verify-email-check',
          element: <VerifyEmailCheck />
        },

        {
          path: '*',
          element: <NotFound />,
        },   
      ]
    }
] )

export default router