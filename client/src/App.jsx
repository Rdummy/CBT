import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/styles/App.css'
import CBTRoute from './route'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CBTRoute/>
    </>
  )
}

export default App
