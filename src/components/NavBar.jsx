import React from 'react'
import PropTypes from 'prop-types'

import NavBarListItem from './NavBarListItem'
const NavBar = ({ empresa }) => {
  return <nav className="text-xl py-2 flex justify-between">
    <h1 className="text-gray-800 font-serif uppercas">{empresa}</h1>
    <ul className="text-gray-600 flex items-center">
      <NavBarListItem to="campanhas">Campanhas</NavBarListItem>
      <NavBarListItem to="questionarios" >Questionários</NavBarListItem>
      <NavBarListItem to="selecao" >Seleção</NavBarListItem>
      <NavBarListItem to="convite" >Envio Convite</NavBarListItem>
      <NavBarListItem to="resposta" >Retorno Questionamento</NavBarListItem>
      <NavBarListItem to="logout" >Logout</NavBarListItem>
    </ul>
  </nav>
}

NavBar.propTypes = {
  empresa: PropTypes.string.isRequired
}

export default NavBar
