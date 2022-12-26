import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import CampanhaList from '../components/CampanhaList'
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

const Campanhas = ({ empresa }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(Number(sessionStorage.getItem('campanhapage')) || 1)
  const { data: { campanhas, totalPages = 1 } = {}, isLoading, error } = useQuery(['campanhas', pageNumber], fetchCampanhas, {
    refetchInterval: 60_000,
    staleTime: 60_000,
    enabled: !!empresa
  })
  const deleteCampanha = useMutation(fetchDeleteCampanhaX, {
    onSuccess: () => {
      queryClient.invalidateQueries(['campanhas', pageNumber])
    }
  })

  return <div>
    <main className='container mx-auto'>
      <div className="flex flex-row justify-center m-8">
        <button className='bg-white hover:bg-gray-100 border rounded shadow px-2' onClick={() => navigate('/campanhanova')}>Nova Campanha</button>
      </div>

      <CampanhaList
        campanhas={ isLoading || error ? [] : campanhas}
        onEdit={campanhaId => {
          // setCampanha(campanhas.find(el => el.id === campanhaId))
          navigate(`/campanhaedit/${campanhaId}`)
        }}
        onDel={campanhaId => {
          deleteCampanha.mutate(campanhaId)
        }}
      />
      <PageControl
        pageNumber={pageNumber}
        totalPages={totalPages}
        onDecrease={() => {
          const newPageNumber = pageNumber - 1
          setPageNumber(newPageNumber)
          sessionStorage.setItem('campanhapage', newPageNumber)
        }}
        onEncrease={() => {
          const newPageNumber = pageNumber + 1
          setPageNumber(newPageNumber)
          sessionStorage.setItem('campanhapage', newPageNumber)
        }}
      />
    </main>
  </div>
}

Campanhas.propTypes = {
  empresa: PropTypes.string
}

export default Campanhas
