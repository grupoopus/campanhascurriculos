import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

import CampanhaList from '../components/CampanhaList'
import PageControl from '../components/PageControl'

const pageSize = 4

const fetchCampanhas = ({ queryKey }) => {
  const pageNumber = queryKey.slice(-1).pop()
  return axios({
    method: 'GET',
    url: '/campanha',
    params: {
      _limit: pageSize,
      _page: pageNumber
    }
  }).then(res => {
    const totalCount = res.headers['x-total-count']
    const completePages = Math.trunc(totalCount / pageSize)
    const incompletePages = totalCount % pageSize !== 0
    const totalPages = incompletePages ? completePages + 1 : completePages
    const campanhas = res.data

    return { campanhas, totalPages }
  })
}

const Campanha = () => {
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(Number(sessionStorage.getItem('campanhapage')) || 1)
  const queryCampanhas = useQuery(['campanhaPage', pageNumber], fetchCampanhas, {
    // refetchInterval: 60_000,
    // staleTime: 60_000,
    keepPreviousData: true
  })

  console.dir(queryCampanhas.data)

  return <main className='container mx-auto'>
    <div className="flex flex-row justify-center m-8">
      <button type="button" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => navigate('/campanhanova')}>Nova Campanha</button>
    </div>
    <CampanhaList
      campanhas={ queryCampanhas.isLoading || queryCampanhas.error ? [] : queryCampanhas.data.campanhas}
      onRowClick={campanhaId => {
        navigate(`/selecao/${campanhaId}`)
      }}
    />
    <PageControl
      pageNumber={pageNumber}
      totalPages={queryCampanhas.data.totalPages}
      loading={queryCampanhas.isPreviousData || queryCampanhas.isLoading}
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
}

export default Campanha
