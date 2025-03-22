import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dendrogram from './components/dendrogram/dendrogram'
import data from "./data/dendrogramMock.json";

function App() {
  return (
    <>
      <Dendrogram data={data}/>
    </>
  )
}

export default App
