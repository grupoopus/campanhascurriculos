import React, { useState } from 'react'
import mockStados from '../components/cidades'
import FuncaoDataList from '../components/FuncaoDataList'

const estados = Object.keys(mockStados)

const CampanhaNova = () => {
  const [uf, setUf] = useState('UF')
  const [cidade, setCidade] = useState('Cidade')
  const cidadesLista = mockStados[uf]?.cidades || []

  return <form action='#' method='POST' className='container mx-auto max-w-2xl mt-16 grid gap-4 grid-cols-12'>
    <div className='col-span-3'>
      <label htmlFor='input_nome' className='block text-sm font-medium text-gray-700'>Nome</label>
      <input
        id="input_nome"
        className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
        type="text"
      />
    </div>
    <div className='col-span-9'>
      <label htmlFor='input_descricao' className='block text-sm font-medium text-gray-700'>Descrição</label>
      <input
        id="input_descricao"
        className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
        type="text"
      />
    </div>
    <div className='col-span-9'>
      <label htmlFor='input_funcao' className='block text-sm font-medium text-gray-700'>Função</label>
      <input
        id="input_funcao"
        list="funcao_list"
        className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
        type="text"
      />
      <FuncaoDataList />
    </div>
    <div className='col-span-3'>
      <label htmlFor='input_validade' className='block text-sm font-medium text-gray-700'>Validade</label>
      <input
        id="input_validade"
        className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
        type="date"
      />
    </div>
    <div className='col-span-12'>
      <label className='ml-2 block text-sm text-gray-500' htmlFor="input_localidade">Localidade</label>
      <div id="input_localidade" className='flex items-center mt-1'>
        <select id="select-uf" className='border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500 mr-1' value={uf} onChange={ev => {
          setUf(ev.target.value)
          setCidade('Cidade')
        }}>
          {
            estados.map(el => <option key={el} value={el}>{el}</option>)
          }
        </select>
        <select id="select-cidade" className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500 ml-1' value={cidade} onChange={ev => {
          setCidade(ev.target.value)
        }}>
        {
          [
            <option key={'cidades'}>Cidade</option>,
            ...cidadesLista.map(el => <option key={el} value={el}>{el}</option>)
          ]
          }
        </select>
      </div>
    </div>
    <div className='col-span-12'>
      <div id="input_localidade" className='flex items-center justify-center mt-4'>
        <button type='button' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>SALVAR</button>
      </div>
    </div>
  </form>
}

export default CampanhaNova
