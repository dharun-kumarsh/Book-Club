import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Authentication.jsx'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Downloads from './pages/Downloads'
import Upload from './pages/Upload'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/downloads',
        element: <Downloads />
      },
      {
        path: '/upload',
        element: <Upload />
      },
      {
        path: '/profile',
        element: <Profile />
      },
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
