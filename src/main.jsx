import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Authentication.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/homepage',
        element: ''
      }
    ]
  },
  {
    path: '/',
    element: <Login />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
