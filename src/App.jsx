import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from 'react-query'

import Navbar from './components/NavBar'
import Raiz from './pages/Raiz'
import Campanhas from './pages/Campanhas'
import CampanhaEdit from './pages/CampanhaEdit'
import CampanhaNova from './pages/CampanhaNova'

const fetchMe = () => fetch('http://localhost:3004/me').then(res => res.json())

function App () {
  const { data: me } = useQuery('me', fetchMe)
  return <>
    <Navbar empresa={me?.empresa || 'logining'}/>
    <Routes>
      <Route path='campanhas' element={<Campanhas empresa={me?.empresa} />}/>
      <Route path='campanhaedit/:campanhaId' element={<CampanhaEdit />}/>
      <Route path='campanhanova' element={<CampanhaNova />}/>
      <Route path='about' element={<h1>about</h1>}/>
      <Route path='*' element={<Raiz />}/>
    </Routes>
  </>
}

export default App
