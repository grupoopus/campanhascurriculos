import React from 'react'
import PropTypes from 'prop-types'

const CampanhaList = ({ campanhas, onEdit, onDel }) => {
  return <table className="table-fixed mx-auto border text-center border-collapse min-w-[80%]">
    <thead>
      <tr className='bg-gray-400 border'>
        <th className='border'>id</th>
        <th className='border'>Campanha</th>
        <th className='border'>Descrição</th>
        <th className='border'>Função</th>
        <th className='border'>Editar</th>
        <th className='border'>Excluir</th>
      </tr>
    </thead>
    <tbody>
      {
        campanhas?.map((el, idx) => <tr className={idx % 2 === 0 ? '' : 'bg-gray-200'} key={el.id}>
          <td className='border'>{el.id}</td>
          <td className='border'>{el.campanha}</td>
          <td className='border'>{el.descricao}</td>
          <td className='border'>{el.funcao}</td>
          <td className='border cursor-pointer' onClick={() => onEdit(el.id)}>edit</td>
          <td className='border cursor-pointer' onClick={() => onDel(el.id)}>del</td>
        </tr>)
      }
    </tbody>
  </table>
}

CampanhaList.propTypes = {
  campanhas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    campanha: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.string.isRequired,
    uf: PropTypes.string.isRequired,
    municipio: PropTypes.string.isRequired,
    palavraChave: PropTypes.string.isRequired,
    validade: PropTypes.string.isRequired
  })),
  onEdit: PropTypes.func.isRequired,
  onDel: PropTypes.func.isRequired
}

export default CampanhaList
