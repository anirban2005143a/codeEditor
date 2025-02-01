import { useState } from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import CodeEditor from './pages/editor/Editor'
import Home from './pages/home/home'
import PhoneNumberPage from './components/auth/Pn'
import OTPPage from './components/auth/Otp'
import SignUpPage from './components/auth/signup'
import SignInPage from './components/auth/signin'

function App() {

  const router = createBrowserRouter([
    {
      path : "/",
      element : <Home/>
    },
    {
      path : "/editor",
      element : <CodeEditor/>
    },
    {
      path: "/Signin",
      element: <SignInPage />,
    },
    {
      path: "/Signup",
      element: <SignUpPage />,
    },
    {
      path: "/OTPverification",
      element: <OTPPage />,
    },
    {
      path: "/mobilenumberverication",
      element: <PhoneNumberPage/>,
    }
  ])

  return (
    <>
       <RouterProvider router={router}/>
    </>
  )
}

export default App
