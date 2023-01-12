import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/NavBar'
import NavBarAnon from './components/NavBarAnon'
import About from './pages/About'
import Contact from './pages/Contact'
import Auth0Token from './pages/Auth0Token'
import Campanha from './pages/Campanha'
import CampanhaNova from './pages/CampanhaNova'
import useAuthMe from './useAuthMe'

import Selecao from './pages/Selecao'

function App () {
  const authMe = useAuthMe()

  if (!authMe.isAuthenticated || authMe.isFetching || authMe.isError) {
    return <>
      <NavBarAnon logining={authMe.isFetching} notSignup={authMe.isError}/>
      <Routes>
        <Route path='*' element={authMe.isError ? <Contact /> : <About />}/>
      </Routes>
    </>
  }

  return <>
    <Navbar empresa={authMe.empresa || 'Carregando'}/>
    <Routes>
      <Route path='auth0token' element={<Auth0Token />}/>
      <Route path='campanha' element={<Campanha />}/>
      <Route path='campanhanova' element={<CampanhaNova />}/>
      <Route path='selecao' element={<Selecao />}/>
      <Route path='*' element={<About />}/>
    </Routes>
  </>
}

export default App

// return <>
//   <Navbar empresa={queryMe.data?.message}/>
//   <Routes>
//     <Route path='auth0token' element={<Auth0Token />}/>
//     <Route path='*' element={<About />}/>
//   </Routes>
// </>

// import CampanhaEdit from './pages/CampanhaEdit'
// import CampanhaNova from './pages/CampanhaNova'
// const LazyCampanhas = React.lazy(() => import('./pages/Campanhas'))

// const CampanhasSuspensed = () => <React.Suspense fallback='Carregando'><LazyCampanhas empresa={me?.empresa} /></React.Suspense>

// return <>
//   <Navbar empresa={me?.empresa || 'loading'}/>
//   <Routes>
//     <Route path='campanhas' element={<CampanhasSuspensed />}/>
//     <Route path='campanhaedit/:campanhaId' element={<CampanhaEdit />}/>
//     <Route path='campanhanova' element={<CampanhaNova />}/>
//     <Route path='auth0token' element={<Auth0Token />}/>
//     <Route path='*' element={<About />}/>
//   </Routes>
// </>
