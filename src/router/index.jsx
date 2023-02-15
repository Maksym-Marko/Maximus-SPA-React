import { createBrowserRouter } from "react-router-dom"

// middlewares
import RequiresGuest from "@/router/middlewares/RequiresGuest"
import RequiresAuth from "@/router/middlewares/RequiresAuth"

// Layouts
import DefaultLayout from "@/components/DefaultLayout"

// Pages
import NotFound from "@/pages/NotFound"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Logout from "@/components/Logout"

const router = createBrowserRouter([
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
            {
              path: 'logout',
              element: <Logout />
            }

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


        {
          path: '*',
          element: <NotFound />,
        },   
      ]
    }
] )

export default router