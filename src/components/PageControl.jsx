import React from 'react'
import PropTypes from 'prop-types'

// bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow

const PageControl = ({ pageNumber, totalPages, onDecrease, onEncrease }) => {
  const decreaseDisabled = pageNumber === 1
  const encreaseDisabled = pageNumber === totalPages
  return <div className="flex flex-row justify-center">
    <button
      className="bg-white hover:bg-gray-100 border rounded shadow px-2"
      disabled={decreaseDisabled}
      onClick={onDecrease}
    >{'<'}</button>
    <span className="mx-2">{`Página ${pageNumber}`}</span>
    <button
      className="bg-white hover:bg-gray-100 border rounded shadow px-2"
      disabled={encreaseDisabled}
      onClick={onEncrease}
    >{'>'}</button>
  </div>
}

PageControl.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onEncrease: PropTypes.func.isRequired
}

export default PageControl
