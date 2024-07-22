import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeSwitcher from './components/ThemeSwitcher'
import Transactions from './components/transactions'
import Card from './components/Card'
import transactions from './data/transactions'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App w-full  mt-28">
        <Transactions/>
      </div>
    </>
  )
}

export default App
