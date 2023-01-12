import React, { useState, useRef } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import mockStados from '../components/cidades'
import FuncaoDataList from '../components/FuncaoDataList'

import PageControl from '../components/PageControl'

const estados = Object.keys(mockStados)
const pageSize = 10

const fetchPostQueryCurriculos = ({ data, _limit, _page }) => axios({
  method: 'POST',
  url: '/curriculo',
  data,
  params: {
    _limit,
    _page
  }
})

const Selecao = () => {
  const [funcao, setFuncao] = useState('')
  const [pcd, setPcd] = useState(false)
  const [cnh, setCnh] = useState('_')
  const [cnhA, setCnhA] = useState(false)
  const [sexo, setSexo] = useState('_')
  const [idadeMin, setIdadeMin] = useState(18)
  const [idadeMax, setIdadeMax] = useState(80)
  const [pretensaoMin, setPretensaoMin] = useState(1300)
  const [pretensaoMax, setPretensaoMax] = useState(60000)
  const [uf, setUf] = useState('UF')
  const cidadesLista = mockStados[uf]?.cidades || []
  const [cidade, setCidade] = useState('Cidade')
  const [cidadesEscolhidas, setCidadesEscolhidas] = useState([])
  const [consulting, setConsulting] = useState(false)
  const tableTopRef = useRef()
  const [curriculos, setCurriculos] = useState([])
  const [lastFilters, setLastFilters] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const queryCurriculos = useMutation(fetchPostQueryCurriculos, {
    onSuccess: el => {
      console.log(`x-total-count=${el.headers['x-total-count']}`)
      const totalCount = el.headers['x-total-count']
      const completePages = Math.trunc(totalCount / pageSize)
      const incompletePages = totalCount % pageSize !== 0
      const newTotalPages = incompletePages ? completePages + 1 : completePages
      setTotalPages(newTotalPages)

      if (el.data && el.data.length > 0) {
        setFuncao('')
        setPcd(false)
        setCnh('_')
        setCnhA(false)
        setSexo('_')
        setIdadeMin(18)
        setIdadeMax(80)
        setPretensaoMin(1300)
        setPretensaoMax(60000)
        setUf('UF')
        setCidade('Cidade')
        setCidadesEscolhidas([])
        setCurriculos(el.data)

        tableTopRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    },
    onSettled: () => {
      setConsulting(false)
    }
  })

  const curriculosHead = ['nome', 'idade', 'sexo', 'cidade', 'telefone', 'deficiencia', 'pretensao', 'habilitacao', 'funcao', 'ultimo_salario']
  // const curriculosHead = Object.keys(curriculos[0] || {})
  const curriculosbody = curriculos.map(row => curriculosHead.map(head => row[head]))

  const adicionarDisable = uf === 'UF' ||
    cidade === 'Cidade' ||
    !!cidadesEscolhidas.find(el => el.uf === uf && el.cidade === cidade)

  return <>
    <form ref={tableTopRef} action='#' method='POST' className='container mx-auto max-w-2xl mt-16 grid gap-4 grid-cols-12'>
      <div className='col-span-9'>
        <label htmlFor='input_funcao' className='block text-sm font-medium text-gray-700'>Função</label>
        <input
          id="input_funcao"
          list="funcao_list"
          className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
          type="text"
          value={funcao}
          onChange={el => {
            setFuncao(el.target.value)
          }}
        />
        <FuncaoDataList />
      </div>
      <div className='col-span-3 flex items-center'>
        <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500'
          id='input-pcd'
          type='checkbox'
          checked={pcd}
          onChange={el => {
            setPcd(el.target.checked)
          }}
        />
        <label className='ml-2 block text-sm text-gray-500' htmlFor='input-pcd'>PCD</label>
      </div>
      <div className='col-span-6'>
        <label htmlFor='select-carteira-carros' className='block text-sm font-medium text-gray-700'>CNH</label>
        <select
          id="select-carteira-carros"
          className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'
          value={cnh}
          onChange={el => {
            setCnh(el.target.value)
          }}
        >
          <option value="_">Selecione</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
        </select>
      </div>
      <div className='col-span-3 flex items-center'>
        <input
          className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500'
          id='input-cnha'
          type='checkbox'
          checked={cnhA}
          onChange={el => {
            setCnhA(el.target.checked)
          }}
        />
        <label className='ml-2 block text-sm text-gray-500' htmlFor='input-cnha'>CNH A (moto)</label>
      </div>
      <div className='col-span-3'>
        <p className='text-sm font-medium text-gray-700'>sexo</p>
        <div className='flex items-center mt-1'>
          <input
            className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500'
            type="radio"
            name="sexo"
            id="sexo_masculino"
            value="masculino"
            checked={sexo === 'masculino'}
            onChange={el => {
              setSexo('masculino')
            }}
          />
          <label className='ml-2 block text-sm text-gray-500' htmlFor="sexo_masculino">masculino</label>
        </div>
        <div className='flex items-center mt-1'>
          <input
            className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500'
            type="radio"
            name="sexo"
            id="sexo_feminino"
            value="feminino"
            checked={sexo === 'feminino'}
            onChange={el => {
              setSexo('feminino')
            }}
          />
          <label className='ml-2 block text-sm text-gray-500' htmlFor="sexo_feminino">feminino</label>
        </div>
        <div className='flex items-center mt-1'>
          <input
            className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500'
            type="radio"
            name="sexo"
            id="sexo_qualquer"
            value="sexo_qualquer"
            checked={sexo === '_'}
            onChange={el => {
              setSexo('_')
            }}
          />
          <label className='ml-2 block text-sm text-gray-500' htmlFor="sexo_qualquer">qualquer</label>
        </div>
      </div>
      <div className='col-span-4'>
        <p className='text-sm font-medium text-gray-700'>Idade</p>
        <div className='flex items-center mt-1'>
          <input
            className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500 mr-1'
            type="number"
            value={idadeMin}
            onChange={el => {
              const elN = Number(el.target.value)
              if (elN < idadeMax) {
                setIdadeMin(Number(elN))
              } else {
                setIdadeMin(Number(idadeMax))
              }
            }}
          />
          <input
            className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500 ml-1'
            type="number"
            value={idadeMax}
            onChange={el => {
              const elN = Number(el.target.value)
              if (elN > idadeMin) {
                setIdadeMax(Number(elN))
              } else {
                setIdadeMax(Number(idadeMin))
              }
            }}
          />
        </div>
      </div>
      <div className='col-span-8'>
        <p className='text-sm font-medium text-gray-700'>Salário</p>
        <div className='flex items-center mt-1'>
          <input
            className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500 mr-1'
            type="number"
            value={pretensaoMin}
            onChange={el => {
              const elN = Number(el.target.value)
              if (elN < pretensaoMax) {
                setPretensaoMin(elN)
              } else {
                setPretensaoMin(pretensaoMax)
              }
            }}
          />
          <input
            className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500 ml-1'
            type="number"
            value={pretensaoMax}
            onChange={el => {
              const elN = Number(el.target.value)
              if (elN > pretensaoMax) {
                setPretensaoMax(elN)
              } else {
                setPretensaoMax(pretensaoMin)
              }
            }}
          />
        </div>
      </div>
      <div className='col-span-12'>
        <p className='text-sm font-medium text-gray-700'>localidade</p>
        <div className='flex items-center mt-1'>
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
          <button type='button' className={`bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white py-1 px-2 mx-2 border-2 border-gray-500 hover:border-transparent rounded-lg${adicionarDisable ? ' cursor-not-allowed' : ''}`} onClick={() => {
            const cidadeEscolhida = {
              uf,
              cidade
            }
            const novaCidadesEscolhidas = cidadesEscolhidas.concat(cidadeEscolhida)
            setCidadesEscolhidas(novaCidadesEscolhidas)
            setUf('UF')
            setCidade('Cidade')
          }}
          disabled={adicionarDisable}
          >ADICIONAR</button>
        </div>
      </div>
      <div className='col-span-12'>
        {
          cidadesEscolhidas.map((el, idx) => <p className='cursor-pointer' key={`${el.uf}-${el.cidade}-${idx}`} onClick={() => {
            setCidadesEscolhidas(cidadesEscolhidas => cidadesEscolhidas.filter(el2 => el.uf !== el2.uf || el.cidade !== el2.cidade))
          }}>{el.uf} - {el.cidade}</p>)
        }
      </div>
      <div className='col-span-12 text-center'>
        <button
          type='button'
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
          disabled={consulting}
          onClick={() => {
            setConsulting(true)
            const hasCnh = cnh !== '_' || cnhA
            const cnhArrs = []
            const cnhArrsA = []
            switch (cnh) {
              case '_':
              case 'b':
                cnhArrs.push('B')
                cnhArrs.push('C')
                cnhArrs.push('D')
                cnhArrs.push('E')
                break
              case 'c':
                cnhArrs.push('C')
                cnhArrs.push('D')
                cnhArrs.push('E')
                break
              case 'd':
                cnhArrs.push('D')
                cnhArrs.push('E')
                break
              case 'e':
                cnhArrs.push('E')
                break
            }

            for (let i = 0; i < cnhArrs.length; i++) {
              cnhArrsA.push(`A${cnhArrs[i]}`)
              if (!cnhA) {
                cnhArrsA.push(cnhArrs[i])
              }
            }

            if (cnh === '_') {
              cnhArrsA.unshift('A')
            }

            const filters = {
              funcao: funcao || undefined,
              deficiencia: pcd || undefined,
              cidade: cidadesEscolhidas.length > 0 ? cidadesEscolhidas.map(el => el.cidade) : undefined,
              cnh: hasCnh ? cnhArrsA : undefined,
              sexo: sexo === '_' ? undefined : sexo,
              idadeMin,
              idadeMax,
              pretensaoMin,
              pretensaoMax
            }

            setPageNumber(1)
            setLastFilters(filters)

            queryCurriculos.mutate({
              data: filters,
              _limit: pageSize,
              _page: 1
            })
          }}
        >{consulting ? 'Consultando' : 'Consultar'}</button>
      </div>
    </form>
    {
      curriculos && curriculos.length > 0
        ? <>
          <table className='mt-12 max-w-4xl mx-auto border text-center border-collapse'>
        <thead className='bg-gray-400'>
          <tr>
            {
              curriculosHead.map((el, idx) => <th key={`${idx}-${el}`}>{el}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            curriculosbody.map((row, idx) => <tr className={idx % 2 === 0 ? '' : 'bg-gray-200'} key={idx}>
              {
                row.map((cell, j) => <td key={j}>{cell}</td>)
              }
            </tr>)
          }
        </tbody>
          </table>
          <PageControl
            pageNumber={pageNumber}
            totalPages={totalPages }
            loading={consulting}
            onDecrease={() => {
              const newPageNumber = pageNumber - 1
              setPageNumber(newPageNumber)
              console.log('page--')
              queryCurriculos.mutate({
                data: lastFilters,
                _limit: pageSize,
                _page: newPageNumber
              })
            }}
            onEncrease={() => {
              const newPageNumber = pageNumber + 1
              setPageNumber(newPageNumber)
              console.log('page++')
              queryCurriculos.mutate({
                data: lastFilters,
                _limit: pageSize,
                _page: newPageNumber
              })
            }}
          />
        </>
        : null
    }
  </>
}
export default Selecao
