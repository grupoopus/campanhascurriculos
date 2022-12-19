import React from 'react'
import PropTypes from 'prop-types'

const CampanhaList = ({ campanhas, onEdit, onDel }) => {
  return <table className="table-auto mx-auto border">
    <thead>
      <tr>
        <th>id</th>
        <th>Campanha</th>
        <th>Descrição</th>
        <th>Função</th>
        <th>Editar</th>
        <th>Excluir</th>
      </tr>
    </thead>
    <tbody>
      {
        campanhas.map(el => <tr key={el.id}>
          <td>{el.id}</td>
          <td>{el.campanha}</td>
          <td>{el.descricao}</td>
          <td>{el.funcao}</td>
          <td className="cursor-pointer" onClick={() => onEdit(el.id)}>edit</td>
          <td className="cursor-pointer" onClick={() => onDel(el.id)}>del</td>
        </tr>)
      }
    </tbody>
  </table>
}

CampanhaList.propTypes = {
  campanhas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    empresa: PropTypes.string.isRequired,
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
