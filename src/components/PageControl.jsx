import React from 'react'
import PropTypes from 'prop-types'

const PageControl = ({ pageNumber, totalPages, loading, onDecrease, onEncrease }) => {
  const decreaseDisabled = pageNumber === 1 || loading
  const pageDisplay = loading ? 'Carregando' : `Página ${pageNumber}`
  const encreaseDisabled = pageNumber === totalPages || loading
  return <div className="flex flex-row justify-center mt-4">
    <button
      className={`bg-white hover:bg-gray-100 border rounded shadow px-2${decreaseDisabled ? ' bg-gray-100' : ''}`}
      disabled={decreaseDisabled}
      onClick={onDecrease}
    >{'<'}</button>
    <span className="mx-2">{pageDisplay}</span>
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
  loading: PropTypes.bool.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onEncrease: PropTypes.func.isRequired
}

export default PageControl
