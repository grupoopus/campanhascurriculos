import React, { useState } from 'react'
import mockStados from '../components/cidades'

const estados = Object.keys(mockStados)

const Selecao = () => {
  const [uf, setUf] = useState('UF')
  const cidadesLista = mockStados[uf]?.cidades || []
  const [cidade, setCidade] = useState('Cidade')
  const [cidadesEscolhidas, setCidadesEscolhidas] = useState([])

  return <form action='#' method='POST' className='max-w-2xl mx-auto mt-16 border grid gap-4 grid-cols-12'>
    <div className='border col-span-9'>
      <label htmlFor='input_funcao' className='block text-sm font-medium text-gray-700'>Função</label>
      <input id="input_funcao" className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500' type="text"/>
    </div>
    <div className='border col-span-3 flex items-center'>
      <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' id='input-pcd' type='checkbox' />
      <label className='ml-2 block text-sm text-gray-500' htmlFor='deficiencia'>PCD</label>
    </div>
    <div className='border col-span-6'>
      <label htmlFor='select-carteira-carros' className='block text-sm font-medium text-gray-700'>CNH</label>
      <select id="select-carteira-carros" className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'>
        <option >Selecione</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
        <option value="e">E</option>
      </select>
    </div>
    <div className='border col-span-3 flex items-center'>
      <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' id='input-cnha' type='checkbox' />
      <label className='ml-2 block text-sm text-gray-500' htmlFor='input-cnha'>CNH A (moto)</label>
    </div>
    <div className='border col-span-3'>
      <p className='text-sm font-medium text-gray-700'>sexo</p>
      <div className='flex items-center mt-1'>
        <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' type="radio" name="sexo" id="sexo_masculino" value="masculino" />
        <label className='ml-2 block text-sm text-gray-500' htmlFor="sexo_masculino">masculino</label>
      </div>
      <div className='flex items-center mt-1'>
        <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' type="radio" name="sexo" id="sexo_feminino" value="feminino" />
        <label className='ml-2 block text-sm text-gray-500' htmlFor="sexo_feminino">feminino</label>
      </div>
      <div className='flex items-center mt-1'>
        <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' type="radio" name="sexo" id="sexo_qualquer" value="sexo_qualquer" checked={true}/>
        <label className='ml-2 block text-sm text-gray-500' htmlFor="sexo_qualquer">qualquer</label>
      </div>
    </div>
    <div className='border col-span-4'>
      <p className='text-sm font-medium text-gray-700'>Idade</p>
      <div className='flex items-center mt-1'>
        <input className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500 mr-1' type="number" value={18}/>
        <input className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500 ml-1' type="number" value={80}/>
      </div>
    </div>
    <div className='border col-span-8'>
      <p className='text-sm font-medium text-gray-700'>Salário</p>
      <div className='flex items-center mt-1'>
        <input className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500 mr-1' type="number" value={1300}/>
        <input className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500 ml-1' type="number" value={60000}/>
      </div>
    </div>
    <div className='border col-span-12'>
      <p className='text-sm font-medium text-gray-700'>localidade</p>
      <div className='flex items-center mt-1'>
        <select id="select-carteira-carros" className='border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500 mr-1' value={uf} onChange={ev => {
          setUf(ev.target.value)
          setCidade('Cidade')
        }}>
          {
            estados.map(el => <option key={el} value={el}>{el}</option>)
          }
        </select>
        <select id="select-carteira-carros" className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500 ml-1' value={cidade} onChange={ev => {
          setCidade(ev.target.value)
        }}>
        {
            [
              <option key={'cidades'}>Cidade</option>,
              ...cidadesLista.map(el => <option key={el} value={el}>{el}</option>)
            ]
          }
        </select>
        <button type='button' className='bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white py-1 px-2 mx-2 border-2 border-gray-500 hover:border-transparent rounded-lg' onClick={() => {
          const cidadeEscolhida = {
            uf,
            cidade
          }
          const novaCidadesEscolhidas = cidadesEscolhidas.concat(cidadeEscolhida)
          setCidadesEscolhidas(novaCidadesEscolhidas)
          setUf('UF')
          setCidade('Cidade')
        }}
        disabled={
          uf === 'UF' ||
          cidade === 'Cidade' ||
          !!cidadesEscolhidas.find(el => el.uf === uf && el.cidade === cidade)
        }
        >ADICIONAR</button>
      </div>
    </div>
    <div className='border col-span-12'>
      {
        cidadesEscolhidas.map((el, idx) => <p key={`${el.uf}-${el.cidade}-${idx}`}>{el.uf} - {el.cidade}</p>)
      }
    </div>
    <div className='border col-span-12 text-center'>
      <button type='button' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Consultar</button>
    </div>
  </form>
}
export default Selecao
