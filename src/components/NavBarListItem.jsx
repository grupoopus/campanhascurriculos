import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const NavBarListItem = ({ children, to }) => {
  const inner = children.split(' ').map((word, idx, lst) => <p className={lst.length > 1 ? 'text-center' : null} key={idx}>{word}</p>)

  return <li className="mr-4">
    <NavLink to={to} className={({ isActive }) => isActive ? 'font-bold' : 'font-normal'}>
      {inner}
    </NavLink>
  </li>
}
// transition ease-in-out delay-150 font-normal hover:font-semibold duration-700
NavBarListItem.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}
export default NavBarListItem
