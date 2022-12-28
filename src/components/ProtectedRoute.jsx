import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args)
  return <Component />
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired
}

export default ProtectedRoute
