import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import HomePage from './pages/Home/HomePage'
import WhiteboxTestingPage from './pages/WhiteBoxTesting/WhiteBoxTestingPage'
import AdversarialAttacksPage from './pages/AdversarialAttacks/AdversarialAttacksPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/WhiteboxTesting" element={<WhiteboxTestingPage />} />
        <Route path="AdversarialAttacks" element={<AdversarialAttacksPage />} />
      </Routes>
    </>
  )
}

export default App
