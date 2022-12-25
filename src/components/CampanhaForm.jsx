import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CampanhaForm = ({ campanha, onSave }) => {
  const [campanhaNome, setCampanhaNome] = useState()
  const [descricao, setDescricao] = useState()
  const [funcao, setFuncao] = useState()
  const [uf, setUf] = useState()
  const [municipio, setMunicipio] = useState()
  const [palavraChave, setPalavraChave] = useState()
  const [validade, setValidade] = useState()

  useEffect(() => {
    if (campanha) {
      setCampanhaNome(campanha.campanha)
      setDescricao(campanha.descricao)
      setFuncao(campanha.funcao)
      setUf(campanha.uf)
      setMunicipio(campanha.municipio)
      setPalavraChave(campanha.palavraChave)
      setValidade(campanha.validade)
    }
  }, [campanha])

  return <form className="grid grid-cols-12 gap-8 mx-auto my-8">
    <input className="border col-span-12" type="text" placeholder="Campanha" value={campanhaNome || ''} onChange={el => setCampanhaNome(el.target.value)}/>
    <input className="border col-span-12" type="text" placeholder="Descrição" value={descricao || ''} onChange={el => setDescricao(el.target.value)}/>
    <input className="border col-span-12" type="text" placeholder="Função" value={funcao || ''} onChange={el => setFuncao(el.target.value)}/>
    <input className="border col-span-3" type="text" placeholder="UF" value={uf || ''} onChange={el => setUf(el.target.value)}/>
    <input className="border col-span-9" type="text" placeholder="Município" value={municipio || ''} onChange={el => setMunicipio(el.target.value)}/>
    <input className="border col-span-6" type="text" placeholder="Palavra Chave" value={palavraChave || ''} onChange={el => setPalavraChave(el.target.value)}/>
    <input className="border col-span-6" type="date" placeholder="Validade" value={validade || ''} onChange={el => setValidade(el.target.value)}/>
    <button className="border col-span-12 bg-gray-200" type="button" disabled={!campanha} onClick={() => {
      onSave({
        id: campanha.id,
        campanha: campanhaNome,
        descricao,
        funcao,
        uf,
        municipio,
        palavraChave,
        validade
      })
    }}>{campanha ? 'Salvar' : '------' }</button>
  </form>
}

CampanhaForm.propTypes = {
  campanha: PropTypes.shape({
    id: PropTypes.number.isRequired,
    campanha: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.string.isRequired,
    uf: PropTypes.string.isRequired,
    municipio: PropTypes.string.isRequired,
    palavraChave: PropTypes.string.isRequired,
    validade: PropTypes.string.isRequired
  }),
  onSave: PropTypes.func.isRequired
}

export default CampanhaForm
