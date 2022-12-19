import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'

import NavBar from '../components/NavBar'
import CampanhaList from '../components/CampanhaList'
import CampanhaForm from '../components/CampanhaForm'

const fetchCampanhas = () => fetch('http://localhost:3004/campanhas').then(res =>res.json())

const Campanhas = () => {
  const [campanha, setCampanha] = useState({})
  const { data: campanhas, isLoading, error } = useQuery('campanhas', fetchCampanhas)
  const deleteCampanha = useMutation({
    mutationFn: campanhaId => fetch(`http://localhost:3004/campanhas/${campanhaId}`, { method: 'DELETE' })
  })

  return <div>
    <NavBar />
    <main className='container mx-auto'>
      <CampanhaForm campanha={campanha} />
      <CampanhaList
        campanhas={ isLoading || error ? [] : campanhas}
        onEdit={campanhaId => {
          console.log(`Edit campanhaId=${campanhaId}`)
          setCampanha(campanhas.find(el => el.id === campanhaId))
        }}
        onDel={campanhaId => {
          console.log(`Del campanhaId=${campanhaId}`)
          deleteCampanha.mutate(campanhaId)
        }}
      />
    </main>
  </div>
}

export default Campanhas
