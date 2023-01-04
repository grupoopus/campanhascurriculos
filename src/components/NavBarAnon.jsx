import React from 'react'
import PropTypes from 'prop-types'

import NavBarLogin from './NavBarLogin'
import NavBarLogout from './NavBarLogout'

const NavBarLoading = () => <li className="mr-4 cursor-pointer">Carregando</li>

const NavBarAnon = ({ logining, notSignup }) => {
  const NavbarLog = notSignup ? NavBarLogout : NavBarLogin

  return <nav className="text-xl py-2 flex justify-between transition ease-in-out delay-150 shadow-lg hover:shadow-xl duration-300">
  <p className="text-gray-800 font-serif uppercase font-semibold my-auto pl-4">CV-bot</p>
  <ul className="text-gray-600 flex items-center pr-4">
    {
      logining
        ? <NavBarLoading />
        : <NavbarLog />
    }
  </ul>
</nav>
}

NavBarAnon.propTypes = {
  logining: PropTypes.bool,
  notSignup: PropTypes.bool
}

export default NavBarAnon
