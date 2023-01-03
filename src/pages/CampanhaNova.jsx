import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const fetchPostCampanha = campanha => axios({
  method: 'POST',
  url: '/campanhas',
  data: campanha
})

const CampanhaNova = () => {
  const [campanhaNome, setCampanhaNome] = useState()
  const [descricao, setDescricao] = useState()
  const [funcao, setFuncao] = useState()
  const [uf, setUf] = useState()
  const [municipio, setMunicipio] = useState()
  const [palavraChave, setPalavraChave] = useState()
  const [validade, setValidade] = useState()

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const postCampanha = useMutation(fetchPostCampanha, {
    onSuccess: () => {
      queryClient.invalidateQueries('campanhas')
      navigate('/campanhas')
    }
  })

  const saveDisabled = !campanhaNome || !(funcao || municipio || palavraChave)

  return <div className="flex flex-col justify-center mt-4">
    <form className="grid grid-cols-12 gap-8 mx-auto my-8">
      <input className="border col-span-12" type="text" placeholder="Campanha" value={campanhaNome || ''} onChange={el => setCampanhaNome(el.target.value)}/>
      <input className="border col-span-12" type="text" placeholder="Descrição" value={descricao || ''} onChange={el => setDescricao(el.target.value)}/>
      <input className="border col-span-12" type="text" placeholder="Função" value={funcao || ''} onChange={el => setFuncao(el.target.value)}/>
      <input className="border col-span-3" type="text" placeholder="UF" value={uf || ''} onChange={el => setUf(el.target.value)}/>
      <input className="border col-span-9" type="text" placeholder="Município" value={municipio || ''} onChange={el => setMunicipio(el.target.value)}/>
      <input className="border col-span-6" type="text" placeholder="Palavra Chave" value={palavraChave || ''} onChange={el => setPalavraChave(el.target.value)}/>
      <input className="border col-span-6" type="date" placeholder="Validade" value={validade || ''} onChange={el => setValidade(el.target.value)}/>

    </form>
    <button className={`bg-white rounded shadow px-4 py-2 mx-auto${saveDisabled ? '' : ' hover:bg-gray-100 border'}`} disabled={saveDisabled} onClick={() => {
      const campanha = {
        campanha: campanhaNome,
        descricao,
        funcao,
        uf,
        municipio,
        palavraChave,
        validade
      }
      console.dir(campanha)
      postCampanha.mutate(campanha)
    }}>SALVAR</button>
  </div>
}
export default CampanhaNova
