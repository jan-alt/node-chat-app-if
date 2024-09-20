import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/layout.css'
import About from './About'
import Contact from './Contact'
import Home from './Home'
import DrawerAppBar from './DrawerAppBar'
import Login from './Login'
import Register from './Register'
import UserProvider from '../context/userContext';
import Chats from '../pages/Chats';
import getEnv from '../../utility/getEnv';



const App = () => {
  // console.log(getEnv(VITE_SERVER_URL))
  return (
    <div>
      <Router>
        <UserProvider>
          <DrawerAppBar />
          <Routes>
            <Route path="/" element={<Chats />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </UserProvider>
      </Router>

    </div>
  )
}

export default App