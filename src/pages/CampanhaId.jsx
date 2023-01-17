import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchCampanhaX = ({ queryKey }) => {
  const campanhaId = queryKey.slice(-1)
  return axios({
    method: 'GET',
    url: `/campanha/id/${campanhaId}`
  }).then(res => res.data)
}

const CampanhaId = () => {
  const { campanhaId } = useParams()
  const { data: campanha } = useQuery(['campanha', campanhaId], fetchCampanhaX, { enabled: !!campanhaId })
  const nome = campanha?.campanha_json?.campaignName || ''
  const descricao = campanha?.campanha_json?.description || ''
  const vagas = 1
  const validade = campanha?.campanha_json?.expirationDate || ''

  return <div className="flex flex-col justify-center mt-16">
    <div className="mx-auto md:min-w-[50%] min-w-full">
      <p className='text-xl'>Nome: <span className='font-bold'>{nome}</span></p>
      <p className='text-lg'>Descricao: <span>{descricao}</span></p>
      <p className='text-lg'>Total de vagas: <span>{vagas}</span></p>
      <p className='text-lg'>Válido até: <span>{validade}</span></p>
    </div>
  </div>
}
export default CampanhaId
