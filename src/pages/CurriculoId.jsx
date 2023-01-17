import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchCurriculoX = ({ queryKey }) => {
  const campanhaId = queryKey.slice(-1)
  return axios({
    method: 'GET',
    url: `/curriculo/id/${campanhaId}`
  }).then(res => res.data)
}

const CurriculoId = () => {
  const { curriculoId } = useParams()
  const { data: curriculo } = useQuery(['campanha', curriculoId], fetchCurriculoX, { enabled: !!curriculoId })

  return <div className="flex flex-col justify-center mt-16">
    <dl className="mx-auto md:min-w-[50%] min-w-full">
      {
        Object
          .entries(curriculo)
          .flatMap(([k, v], idx) => {
            const dt = <dt key={`k-${idx}`} className='text-xl font-bold'>{k}</dt>
            const dd = <dd key={`v-${idx}`} className='text-xl pl-8'>- {v}</dd>
            return [dt, dd]
          })
      }
    </dl>
  </div>
}
export default CurriculoId
