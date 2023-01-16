import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

const fetchPostCampanha = ({ campanha }) => axios({
  method: 'POST',
  url: '/campanha',
  data: campanha
})

const CampanhaNova = () => {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [vagas, setVagas] = useState(1)
  const [validade, setValidade] = useState()
  const [descricao, setDescricao] = useState('')

  const postCampanha = useMutation(fetchPostCampanha, {
    onSuccess: () => {
      navigate('/campanha')
    },
    onError: err => {
      console.log(err.response.data.message)
    }
  })

  return <form action='#' method='POST' className='container mx-auto max-w-2xl mt-16 grid gap-4 grid-cols-12'>
    <div className='col-span-6'>
      <label htmlFor='input_nome' className='block text-sm font-medium text-gray-700'>Nome</label>
      <input
        id="input_nome"
        className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
        type="text"
        value={nome}
        onChange={el => setNome(el.target.value)}
      />
    </div>
    <div className='col-span-2'>
      <label htmlFor='input_vagas' className='block text-sm font-medium text-gray-700'>Vagas</label>
      <input
        id="input_vagas"
        className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
        type="number"
        min={1}
        multiple={1}
        value={vagas}
        onChange={el => setVagas(el.target.value)}
      />
    </div>
    <div className='col-span-4'>
      <label htmlFor='input_validade' className='block text-sm font-medium text-gray-700'>Validade</label>
      <input
        id="input_validade"
        className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
        type="date"
        value={validade}
        onChange={el => setValidade(el.target.value)}
      />
    </div>
    <div className='col-span-12'>
      <label htmlFor='input_descricao' className='block text-sm font-medium text-gray-700'>Descrição</label>
      <textarea
        id="input_descricao"
        rows={6}
        className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
        value={descricao}
        onChange={el => setDescricao(el.target.value)}
      />
    </div>

    <div className='col-span-12'>
      <div id="input_localidade" className='flex items-center justify-center mt-4'>
        <button
          type='button'
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
          disabled={postCampanha.isLoading}
          onClick={() => {
            postCampanha.mutate({
              campanha: {
                nome,
                vagas,
                validade,
                descricao
              }
            })
          }}
        >SALVAR</button>
      </div>
    </div>
  </form>
}

export default CampanhaNova
