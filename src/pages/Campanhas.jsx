import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import NavBar from '../components/NavBar'
import CampanhaList from '../components/CampanhaList'
import CampanhaForm from '../components/CampanhaForm'
import PageControl from '../components/PageControl'

const pageSize = 4

const fetchCampanhas = ({ queryKey }) => {
  const pageNumber = queryKey.slice(-1)
  return fetch(`http://localhost:3004/campanhas?_limit=${pageSize}&_page=${pageNumber}`).then(res => res.json())
}
const fetchCampanhasinfo = () => fetch('http://localhost:3004/campanhasinfo').then(res => res.json())
const fetchDeleteCampanhaX = (id) => fetch(`http://localhost:3004/campanhas/${id}`, { method: 'DELETE' })
const fetchUpdateCampanhaX = (data) => fetch(`http://localhost:3004/campanhas/${data.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

const Campanhas = ({ empresa }) => {
  const queryClient = useQueryClient()
  const [pageNumber, setPageNumber] = useState(1)
  const [campanha, setCampanha] = useState()
  const { data: totalPages } = useQuery('campanhasinfo', fetchCampanhasinfo, {
    initialData: 1,
    refetchInterval: 5_000,
    select: data => {
      const completePages = Math.trunc(data.total / pageSize)
      const incompletePages = data.total % pageSize !== 0
      return incompletePages ? completePages + 1 : completePages
    }
  })
  const { data: campanhas, isLoading, error } = useQuery(['campanhas', pageNumber], fetchCampanhas, { refetchInterval: 5_000, enabled: !!empresa })
  const deleteCampanha = useMutation(fetchDeleteCampanhaX, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('campanhasinfo')
      queryClient.invalidateQueries(['campanhas', pageNumber])
    }
  })
  const updateCampanha = useMutation(fetchUpdateCampanhaX, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['campanhas', pageNumber])
    }
  })

  return <div>
    <NavBar empresa={empresa || 'logining'} />
    <main className='container mx-auto'>
      <CampanhaForm
        campanha={campanha}
        onSave={c => {
          updateCampanha.mutate(c)
          setCampanha()
        }}
      />
      <CampanhaList
        campanhas={ isLoading || error ? [] : campanhas}
        onEdit={campanhaId => {
          setCampanha(campanhas.find(el => el.id === campanhaId))
        }}
        onDel={campanhaId => {
          deleteCampanha.mutate(campanhaId)
        }}
      />
      <PageControl
        pageNumber={pageNumber}
        totalPages={totalPages}
        onDecrease={() => {
          setPageNumber(pageNumber - 1)
        }}
        onEncrease={() => {
          setPageNumber(pageNumber + 1)
        }}
      />
    </main>
  </div>
}

Campanhas.propTypes = {
  empresa: PropTypes.string
}

export default Campanhas
