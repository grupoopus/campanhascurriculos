import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

import NiceTable from '../components/NiceTable'
import PageControl from '../components/PageControl'

const pageSize = 20

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

const campanhaHead = [
  'id',
  'Campanha',
  'Descrição',
  'Função',
  'Local',
  'Expiração'
]

const Campanha = () => {
  const tableRef = useRef()
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(Number(sessionStorage.getItem('campanhapage')) || 1)
  const queryCampanhas = useQuery(['campanhaPage', pageNumber], fetchCampanhas, {
    // refetchInterval: 60_000,
    // staleTime: 60_000,
    keepPreviousData: true,
    onSuccess: el => {
      tableRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })

  return <main className='container mx-auto'>
    <div className="flex flex-row justify-center m-8">
      <button type="button" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => navigate('/campanhanova')}>Nova Campanha</button>
    </div>
    <NiceTable
      tableRef={tableRef}
      head={campanhaHead}
      body={
        queryCampanhas.isLoading || queryCampanhas.error
          ? []
          : queryCampanhas.data.campanhas.map(el => ({
            id: el.id,
            Campanha: el.campaignName,
            Descrição: el.description,
            Função: el.role,
            Local: `${el.UF} ${el.city}`,
            Expiração: el.expirationDate
          }))
      }
      rowClick={campanha => {
        navigate(`/campanha/${campanha.id}`)
      }}
    />
    <PageControl
      pageNumber={pageNumber}
      totalPages={queryCampanhas.data?.totalPages || 1}
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
