import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import PropTypes from 'prop-types'

import NavBarListItem from './NavBarListItem'
import NavBarLogin from './NavBarLogin'
import NavBarLogout from './NavBarLogout'

const NavBar = ({ empresa }) => {
  const { isAuthenticated } = useAuth0()
  return <nav className="text-xl py-2 flex justify-between transition ease-in-out delay-150 shadow-lg hover:shadow-xl duration-300">
    <p className="text-gray-800 font-serif uppercase font-semibold my-auto pl-4">{empresa}</p>
    <ul className="text-gray-600 flex items-center pr-4">
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
