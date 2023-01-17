import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import SelecaoForm from '../components/SelecaoForm'
import NiceTable from '../components/NiceTable'
import PageControl from '../components/PageControl'

const pageSize = 20

const fetchPostQueryCurriculos = ({ data, _limit, _page }) => axios({
  method: 'POST',
  url: '/curriculo',
  data,
  params: {
    _limit,
    _page
  }
})

const curriculosHead = ['nome', 'idade', 'sexo', 'cidade', 'telefone', 'deficiencia', 'pretensao', 'habilitacao', 'funcao', 'ultimo_salario']

const Selecao = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const tableRef = useRef()
  const [lastFilters, setLastFilters] = useState()
  const [curriculos, setCurriculos] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const queryCurriculos = useMutation(fetchPostQueryCurriculos, {
    onSuccess: el => {
      const totalCount = el.headers['x-total-count']
      const completePages = Math.trunc(totalCount / pageSize)
      const incompletePages = totalCount % pageSize !== 0
      const newTotalPages = incompletePages ? completePages + 1 : completePages
      setTotalPages(newTotalPages)

      if (el.data && el.data.length >= 0) {
        setCurriculos(el.data)
        el.data?.forEach(curriculo => {
          queryClient.setQueryData(['curriculo', String(curriculo.id)], curriculo)
        })
        tableRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  })

  return <>
    <SelecaoForm consulting={queryCurriculos.isLoading} toConsult={filters => {
      setLastFilters(filters)
      setPageNumber(1)
      queryCurriculos.mutate({
        data: filters,
        _limit: pageSize,
        _page: 1
      })
    }}/>
    {
      curriculos && curriculos.length > 0
        ? <>
          <NiceTable tableRef={tableRef} head={curriculosHead} body={curriculos} rowClick={curriculo => {
            navigate(`/curriculo/${curriculo.id}`)
          }}/>
          <PageControl
            pageNumber={pageNumber}
            totalPages={totalPages}
            loading={queryCurriculos.isLoading || queryCurriculos.isPreviousData || false}
            onDecrease={() => {
              const newPageNumber = pageNumber - 1
              setPageNumber(newPageNumber)
              queryCurriculos.mutate({
                data: lastFilters,
                _limit: pageSize,
                _page: newPageNumber
              })
            }}
            onEncrease={() => {
              const newPageNumber = pageNumber + 1
              setPageNumber(newPageNumber)
              queryCurriculos.mutate({
                data: lastFilters,
                _limit: pageSize,
                _page: newPageNumber
              })
            }}
          />
        </>
        : null
    }
  </>
}
export default Selecao
