import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import PropTypes from 'prop-types'

const Auth0ProviderWithRedirectCallback = ({ children }) => {
  const navigate = useNavigate()
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname)
  }
  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        redirectUri={`${window.location.origin}/redirectsuccessfullogin`}
        audience={`https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`}
        scope='openid profile email read:roles'
    >
      {children}
    </Auth0Provider>
  )
}

Auth0ProviderWithRedirectCallback.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Auth0ProviderWithRedirectCallback
