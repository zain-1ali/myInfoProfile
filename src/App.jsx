import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Page/Home'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:userid" element={<Home />} />

        </Routes>
      </BrowserRouter>




    </div>
  )
}

export default App
