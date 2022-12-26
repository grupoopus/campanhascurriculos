import React from 'react'
import { useParams } from 'react-router-dom'

const CampanhaEdit = () => {
  const { campanhaId = 0 } = useParams()
  return <div className="flex flex-row justify-center mt-4">
    <p>{`Edita campanha ${campanhaId}`}</p>
  </div>
}
export default CampanhaEdit
