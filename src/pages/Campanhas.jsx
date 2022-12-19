import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'

import NavBar from '../components/NavBar'
import CampanhaList from '../components/CampanhaList'
import CampanhaForm from '../components/CampanhaForm'

const fetchCampanhas = () => fetch('http://localhost:3004/campanhas').then(res => res.json())
const fetchDeleteCampanhaX = (id) => fetch(`http://localhost:3004/campanhas/${id}`, { method: 'DELETE' })
const fetchUpdateCampanhaX = (data) => fetch(`http://localhost:3004/campanhas/${data.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

const Campanhas = () => {
  const [campanha, setCampanha] = useState({})
  const { data: campanhas, isLoading, error, refetch: campanhasRefetch } = useQuery('campanhas', fetchCampanhas)
  const deleteCampanha = useMutation({
    mutationFn: fetchDeleteCampanhaX,
    onSuccess: (data) => {
      campanhasRefetch()
    }
  })
  const updateCampanha = useMutation({
    mutationFn: fetchUpdateCampanhaX,
    onSuccess: (data) => {
      campanhasRefetch()
    }
  })

  return <div>
    <NavBar />
    <main className='container mx-auto'>
      <CampanhaForm campanha={campanha} onSave={c => {
        updateCampanha.mutate(c)
        setCampanha({})
      }} />
      <CampanhaList
        campanhas={ isLoading || error ? [] : campanhas}
        onEdit={campanhaId => {
          setCampanha(campanhas.find(el => el.id === campanhaId))
        }}
        onDel={campanhaId => {
          deleteCampanha.mutate(campanhaId)
        }}
      />
    </main>
  </div>
}

export default Campanhas
