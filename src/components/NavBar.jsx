import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import PropTypes from 'prop-types'

import NavBarListItem from './NavBarListItem'
import NavBarLogin from './NavBarLogin'
import NavBarLogout from './NavBarLogout'

const NavBar = ({ empresa }) => {
  const { isAuthenticated } = useAuth0()
  return <nav className="text-xl py-2 flex justify-between">
    <h1 className="text-gray-800 font-serif uppercas">{empresa}</h1>
    <ul className="text-gray-600 flex items-center">
      {
        isAuthenticated
          ? <>
            <NavBarListItem to="campanhas">Campanhas</NavBarListItem>
            <NavBarListItem to="questionarios">Questionários</NavBarListItem>
            <NavBarListItem to="selecao">Seleção</NavBarListItem>
            <NavBarListItem to="convite">Envio Convite</NavBarListItem>
            <NavBarListItem to="resposta">Retorno Questionamento</NavBarListItem>
          </>
          : null
      }
      {
        isAuthenticated
          ? <NavBarLogout />
          : <NavBarLogin />
      }

    </ul>
  </nav>
}

NavBar.propTypes = {
  empresa: PropTypes.string.isRequired
}

export default NavBar
