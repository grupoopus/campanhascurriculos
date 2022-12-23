import React from 'react'
import PropTypes from 'prop-types'

const NavBarListItem = ({ children, selected }) => {
  const inner = children.split(' ').map((word, idx, lst) => <p className={lst.length > 1 ? 'text-center' : null} key={idx}>{word}</p>)

  return <li className="mr-4">
    <a href="#" className={selected ? 'font-bold' : null}>{inner}</a>
  </li>
}

NavBarListItem.propTypes = {
  children: PropTypes.string.isRequired,
  selected: PropTypes.bool
}
export default NavBarListItem
