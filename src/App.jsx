import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Supervisor from './components/Supervisor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <h1 className='text-red-500'>testing tailwind</h1> */}
      <Supervisor/>
    </div>
  )
}

export default App
