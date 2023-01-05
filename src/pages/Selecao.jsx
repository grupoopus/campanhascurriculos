import React from 'react'

const Selecao = () => {
  return <main className='max-w-2xl mx-auto mt-16 border'>
    <form action='#' method='POST'>
      <div className=' mt-2'>
        <label htmlFor='input_funcao' className='block text-sm font-medium text-gray-700'>Função</label>
        <input id="input_funcao" className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500' type="text"/>
      </div>
      <div className=' mt-2'>
        <label htmlFor='select-carteira-carros' className='block text-sm font-medium text-gray-700'>CNH</label>
        <select id="select-carteira-carros" className='w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500'>
          <option >Selecione</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
        </select>
      </div>
      <div className='flex items-center mt-2'>
        <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' id='input-cnha' type='checkbox' />
        <label className='ml-2 block text-sm text-gray-500' htmlFor='input-cnha'>CNH A (moto)</label>
      </div>
      <div className='flex items-center  mt-2'>
        <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' id='input-pcd' type='checkbox' />
        <label className='ml-2 block text-sm text-gray-500' htmlFor='deficiencia'>PCD</label>
      </div>
      <div className='mt-2'>
        <p className='text-sm font-medium text-gray-700'>sexo</p>
        <div className='flex items-center mt-1'>
          <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' type="radio" name="sexo" id="sexo_masculino" value="masculino" />
          <label className='ml-2 block text-sm text-gray-500' htmlFor="sexo_masculino">masculino</label>
        </div>
        <div className='flex items-center mt-1'>
          <input className='h-5 w-5 rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' type="radio" name="sexo" id="sexo_feminino" value="feminino" />
          <label className='ml-2 block text-sm text-gray-500' htmlFor="sexo_feminino">feminino</label>
        </div>
      </div>
      <div className='mt-2'>
        <p className='text-sm font-medium text-gray-700'>Idade</p>
        <div className='flex items-center mt-1'>
          <input className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' type="number" value={18}/>
          <input className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' type="number" value={80}/>
        </div>
      </div>
      <div className='mt-2'>
        <p className='text-sm font-medium text-gray-700'>Salário</p>
        <div className='flex items-center mt-1'>
          <input className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' type="number" value={1300}/>
          <input className='w-full rounded-lg border-gray-300 text-gray-500 focus:border-gray-500 focus:ring-gray-500' type="number" value={60000}/>
        </div>
      </div>
    </form>
  </main>
}
// focus:border-indigo-500 focus:ring_indigo
export default Selecao

/*

    <input type="radio" name="sexo" id="sexo_masculino" value="masculino" />
    <label htmlFor="sexo_masculino">masculino</label>
    <input type="radio" name="sexo" id="sexo_feminino" value="feminino" />
    <label htmlFor="sexo_masculino">feminino</label>
    <input type="number" placeholder='idade mínima'/>
    <input type="number" placeholder='idade máxima'/>
    <input type="number" placeholder='salário mínimo'/>
    <input type="number" placeholder='salário máximo'/>
*/
