import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchMe = () => axios({
  method: 'GET',
  url: '/health'
}).then(res => res.data)

const useAuthMe = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
  const [jwtAuth0, setJwtAuth0] = useState()
  const queryMe = useQuery('me', fetchMe, { enabled: !!jwtAuth0, refetchOnWindowFocus: false, retry: 1 })

  useEffect(() => {
    if (isAuthenticated && !jwtAuth0) {
      getAccessTokenSilently()
        .then(token => {
          console.log('get auth0 token')
          setJwtAuth0(token)
          axios.defaults.headers.common.Authorization = token
          localStorage.setItem('jwt', token)
        })
    }
  }, [isAuthenticated])

  return {
    isAuthenticated,
    isFetching: isLoading || queryMe.isFetching,
    isError: queryMe.isError,
    empresa: queryMe.data?.message
  }
}

export default useAuthMe
