import { Routes, Route } from 'react-router-dom'
import Login from './components/auth/Authentication.jsx'
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'
import Downloads from './pages/Downloads.jsx'
import Upload from './pages/Upload.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="downloads" element={<Downloads />} />
        <Route path="upload" element={<Upload />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
