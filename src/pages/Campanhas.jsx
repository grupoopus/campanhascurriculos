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
  return fetch(`http://localhost:3004/campanhas?_limit=${pageSize}&_page=${pageNumber}`).then(async res => {
    const totalCount = res.headers.get('x-total-count')
    const completePages = Math.trunc(totalCount / pageSize)
    const incompletePages = totalCount % pageSize !== 0
    const totalPages = incompletePages ? completePages + 1 : completePages
    const campanhas = await res.json()
    return { campanhas, totalPages }
  })
}
const fetchDeleteCampanhaX = (id) => fetch(`http://localhost:3004/campanhas/${id}`, { method: 'DELETE' })
const fetchUpdateCampanhaX = (data) => fetch(`http://localhost:3004/campanhas/${data.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

const Campanhas = ({ empresa }) => {
  const queryClient = useQueryClient()
  const [pageNumber, setPageNumber] = useState(1)
  const [campanha, setCampanha] = useState()
  const { data: { campanhas, totalPages = 1 } = {}, isLoading, error } = useQuery(['campanhas', pageNumber], fetchCampanhas, { refetchInterval: 60_000, enabled: !!empresa })
  const deleteCampanha = useMutation(fetchDeleteCampanhaX, {
    onSuccess: () => {
      queryClient.invalidateQueries(['campanhas', pageNumber])
    }
  })
  const updateCampanha = useMutation(fetchUpdateCampanhaX, {
    onSuccess: () => {
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
