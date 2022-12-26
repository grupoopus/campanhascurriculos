import React from 'react'
import PropTypes from 'prop-types'

const PageControl = ({ pageNumber, totalPages, onDecrease, onEncrease }) => {
  const decreaseDisabled = pageNumber === 1
  const encreaseDisabled = pageNumber === totalPages
  return <div className="flex flex-row justify-center mt-4">
    <button
      className={`bg-white hover:bg-gray-100 border rounded shadow px-2${decreaseDisabled ? ' bg-gray-100' : ''}`}
      disabled={decreaseDisabled}
      onClick={onDecrease}
    >{'<'}</button>
    <span className="mx-2">{`Página ${pageNumber}`}</span>
    <button
      className={`bg-white hover:bg-gray-100 border rounded shadow px-2${encreaseDisabled ? ' bg-gray-100' : ''}`}
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
