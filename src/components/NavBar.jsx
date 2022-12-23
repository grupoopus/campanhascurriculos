import React from 'react'
import PropTypes from 'prop-types'

import NavBarListItem from './NavBarListItem'
const NavBar = ({ empresa }) => {
  return <nav className="text-xl py-2 flex justify-between">
    <h1 className="text-gray-800 font-serif uppercas">{empresa}</h1>
    <ul className="text-gray-600 flex items-center">
      <NavBarListItem selected>Campanhas</NavBarListItem>
      <NavBarListItem>Questionamento</NavBarListItem>
      <NavBarListItem>Seleção</NavBarListItem>
      <NavBarListItem>Envio Convite</NavBarListItem>
      <NavBarListItem>Retorno Questionamento</NavBarListItem>
      <NavBarListItem>Logout</NavBarListItem>
    </ul>
  </nav>
}

NavBar.propTypes = {
  empresa: PropTypes.string.isRequired
}

export default NavBar
