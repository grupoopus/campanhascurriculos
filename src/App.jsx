import { useState } from 'react'
import { useQuery } from 'react-query'

import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { isLoading, error, data } = useQuery('profile', () =>
  fetch('http://localhost:3004/profile').then(res =>
    res.json()
  ))

  if (isLoading) return 'Loading...'
 
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="flex h-screen">
        <div className="m-auto">
            <div className="text-6xl text-red-600">{count}</div>
            <button className="px-6 py-2 rounded bg-green-800 hover:bg-green-600 text-white" type="button" onClick={() => setCount((count) => count + 1)}>
                count+
            </button>
        </div>
    </div>
)
}

export default App
