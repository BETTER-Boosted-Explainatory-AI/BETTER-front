import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "@mui/material/styles";
import BetterTheme from "./MuiTheme.style.js";
import './App.css'
import Header from './components/Header/Header'
import HomePage from './pages/Home/HomePage'
import WhiteboxTestingPage from './pages/WhiteBoxTesting/WhiteBoxTestingPage'
import AdversarialAttacksPage from './pages/AdversarialAttacks/AdversarialAttacksPage'

function App() {
  return (
    <ThemeProvider theme={BetterTheme}>
      <header>
        <Header />
      </header>
      <div id="mainBody">
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/WhiteboxTesting" element={<WhiteboxTestingPage />} />
        <Route path="AdversarialAttacks" element={<AdversarialAttacksPage />} />
      </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
