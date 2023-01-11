import React from 'react'
import PropTypes from 'prop-types'

const CampanhaList = ({ campanhas, onRowClick }) => {
  return <table className="table-fixed mx-auto border text-center border-collapse min-w-[80%]">
    <thead>
      <tr className='bg-gray-400 border'>
        <th>id</th>
        <th>Campanha</th>
        <th>Descrição</th>
        <th>Função</th>
        <th>Local</th>
        <th>Expiração</th>
      </tr>
    </thead>
    <tbody>
      {
        campanhas?.map((el, idx) => <tr onClick={() => onRowClick(el.id)} className={idx % 2 === 0 ? 'cursor-pointer' : 'cursor-pointer bg-gray-200'} key={el.id}>
          <td>{el.id}</td>
          <td>{el.campaignName}</td>
          <td>{el.description}</td>
          <td>{el.role}</td>
          <td>{`${el.UF} ${el.city}`}</td>
          <td>{el.expirationDate}</td>
        </tr>)
      }
    </tbody>
  </table>
}

CampanhaList.propTypes = {
  campanhas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    campaignName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    UF: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    expirationDate: PropTypes.string.isRequired
  })),
  onRowClick: PropTypes.func.isRequired
}

export default CampanhaList
