import { useState } from 'react'
import { useQuery } from 'react-query'

import Campanhas from './pages/Campanhas'

function App() {
  
  const { isLoading, error, data } = useQuery('profile', () =>
  fetch('http://localhost:3004/profile').then(res =>
    res.json()
  ))

  if (isLoading) return 'Loading...'
 
  if (error) return 'An error has occurred: ' + error.message

  return <Campanhas />
}

export default App
