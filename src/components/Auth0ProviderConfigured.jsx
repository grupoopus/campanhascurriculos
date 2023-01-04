import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import PropTypes from 'prop-types'

const Auth0ProviderConfigured = ({ children }) => <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={`https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`}
    scope='openid profile email read:roles'
  >
  {children}
</Auth0Provider>

Auth0ProviderConfigured.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Auth0ProviderConfigured
