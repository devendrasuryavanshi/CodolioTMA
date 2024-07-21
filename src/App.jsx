import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeSwitcher from './ThemeSwitcher'
import Navbar from './Navbar'
import Transactions from './transactions'
import Card from './Card'
import transactions from './data/transactions'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App w-full mt-28">
        <Transactions/>
      </div>
    </>
  )
}

export default App
