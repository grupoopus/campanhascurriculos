import React from 'react'
import { useQuery } from 'react-query'

import Campanhas from './pages/Campanhas'

const fetchMe = () => fetch('http://localhost:3004/me').then(res => res.json())

function App () {
  const { data: me } = useQuery('me', fetchMe)
  return <Campanhas empresa={me?.empresa} />
}

export default App
