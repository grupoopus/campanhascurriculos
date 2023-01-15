import React from 'react'
import PropTypes from 'prop-types'

const SelecaoTable = ({ tableRef, head, body, rowClick }) => {
  const mappedBody = body.map(row => head.map(key => row[key] || ''))
  return <table ref={tableRef} className='mt-12 max-w-4xl mx-auto border text-center border-collapse'>
    <thead className='bg-gray-400'>
      <tr>
        {
          head.map((el, idx) => <th key={`${idx}-${el}`}>{el}</th>)
        }
      </tr>
    </thead>
        {
          mappedBody.map((row, idx) => <tr
            className={idx % 2 === 0 ? 'cursor-pointer hover:bg-gray-100' : 'cursor-pointer bg-gray-200 hover:bg-gray-300'}
            key={idx}
            onClick={() => rowClick(body[idx])}
          >
            {
              row.map((cell, j) => <td key={j}>{cell}</td>)
            }
          </tr>)
        }
    <tbody>

    </tbody>
  </table>
}

SelecaoTable.propTypes = {
  tableRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(<table />) })
  ]).isRequired,
  head: PropTypes.arrayOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowClick: PropTypes.func.isRequired
}

export default SelecaoTable
