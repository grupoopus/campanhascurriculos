import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from 'react-query'

import Navbar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import Raiz from './pages/Raiz'
import CampanhaEdit from './pages/CampanhaEdit'
import CampanhaNova from './pages/CampanhaNova'

const LazyCampanhas = React.lazy(() => import('./pages/Campanhas'))

const fetchMe = () => fetch('http://localhost:3004/me').then(res => res.json())

function App () {
  const { data: me } = useQuery('me', fetchMe)
  const CampanhasSuspense = () => <React.Suspense fallback='Carregando'><LazyCampanhas empresa={me?.empresa} /></React.Suspense>

  return <>
    <Navbar empresa={me?.empresa || 'logining'}/>
    <Routes>
      <Route path='campanhas' element={<ProtectedRoute component={CampanhasSuspense} />}/>
      <Route path='campanhaedit/:campanhaId' element={<ProtectedRoute component={CampanhaEdit} />}/>
      <Route path='campanhanova' element={<ProtectedRoute component={CampanhaNova} />}/>
      <Route path='*' element={<Raiz />}/>
    </Routes>
  </>
}

export default App
