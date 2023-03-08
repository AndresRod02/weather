import './App.css'
import Weather from './components/weather'
import { load } from './components/load'
import DarkTheme from './components/DarkTheme'
function App() {

  return (
    
    <div className="App">
      {window.addEventListener('load', function () {
      load()
      })}
      <div className='switchContainer'>
      <DarkTheme/>
      </div>
      <Weather/>
    </div>
  )
}

export default App
