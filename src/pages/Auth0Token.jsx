import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const CampanhaEdit = () => {
  const [token, setToken] = useState()
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  useEffect(() => {
    if (isAuthenticated && !token) {
      getAccessTokenSilently()
        .then(setToken)
    }
  }, [isAuthenticated, token])

  return <div className="md:max-w-[50%] mx-auto mt-16 text-center">
    <p className='break-all'>{
    isAuthenticated && token
      ? token
      : 'carregando seus dados'
    }</p>
  </div>
}

export default CampanhaEdit
