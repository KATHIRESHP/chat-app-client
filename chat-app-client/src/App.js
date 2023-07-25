import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import SetAvatar from './pages/SetAvatar'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='bg-gradient-to-t h-screen md:bg-gradient-to-r from-blue-600 to-red-600 font-serif text-xl md:text-lg xl:text-sm'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/setAvatar' element={<SetAvatar/>} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App