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

export default CampanhaList