import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const NavBarListItem = () => {
  const { loginWithRedirect } = useAuth0()

  return <li className="mr-4 cursor-pointer" onClick={() => loginWithRedirect()}>
    <p>Login</p>
  </li>
}

export default NavBarListItem
