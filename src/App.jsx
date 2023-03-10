import './App.css'
import Weather from './components/Weather'
import DarkTheme from './components/DarkTheme'
import { useState, useEffect } from 'react'
function App() {

useEffect(()=>{
  if(Weather === true){
    setIsLoading(false)
  }
}, [])
  return (
    
    <div className="App">
      <Weather/>
      <div className='switchContainer'>
      <DarkTheme/>
      </div>
    </div>
  )
}

export default App
