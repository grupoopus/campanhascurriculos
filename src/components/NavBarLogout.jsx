import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const NavBarListItem = () => {
  const { logout } = useAuth0()

  return <li className="mr-4 cursor-pointer" onClick={() => logout({ returnTo: window.location.origin })}>
    <p>Logout</p>
  </li>
}

export default NavBarListItem
