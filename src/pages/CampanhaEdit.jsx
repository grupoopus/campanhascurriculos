import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchCampanhaX = ({ queryKey }) => {
  const campanhaId = queryKey.slice(-1)
  return axios({
    method: 'GET',
    url: `/campanhas/${campanhaId}`
  }).then(res => res.data)
}

const CampanhaEdit = () => {
  const { campanhaId } = useParams()
  const { data: campanha } = useQuery(['campanha', campanhaId], fetchCampanhaX, { enabled: !!campanhaId })

  const text = JSON.stringify(campanha, null, 2)
  const rows = text?.split('\n').length || 3

  return <div className="flex flex-col justify-center mt-4">
    <textarea className="mx-auto md:min-w-[80%] min-w-full" rows={rows} value={text}/>
  </div>
}
export default CampanhaEdit
