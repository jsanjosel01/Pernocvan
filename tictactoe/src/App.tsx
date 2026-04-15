import { useState } from 'react'
import './App.css'

import BoardPage from './pages/BoardPage'
import HomePage from './pages/HomePage'
import RankingPage from './pages/RankingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFoundPage from './pages/NotFoundPage'



function App() {

  return (
    <Router>
      <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/ranking' element={<RankingPage/>}></Route>
          <Route path='/board' element={<BoardPage/>}></Route>
          <Route path='*' element={<NotFoundPage/>}></Route>
        </Routes>
    </Router>
    
  )


}

export default App
