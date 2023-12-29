import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import { useEffect } from 'react'

const App = () => {

  useEffect(() => {
    if (window.location.pathname === '/' && localStorage.getItem('token')) {
      window.location.href = '/home'
    }
    if (window.location.pathname === '/home' && !localStorage.getItem('token')) {
      window.location.href = '/'
    }
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App