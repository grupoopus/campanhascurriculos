import React from 'react'

const Selecao = () => {
  return <main className='max-w-2xl mx-auto mt-16 border'>
    <input type="text" placeholder='função'/>
    <br />
    <select name="cnh">
      <option selected value>CNH</option>
      <option value="b">B</option>
      <option value="c">C</option>
      <option value="d">D</option>
      <option value="e">E</option>
    </select>
    <input type="checkbox" id='checkbox_cnhMoto'/>
    <label htmlFor="cnhMoto">CNH A</label>
    <br />
    <input type="checkbox" id='checkbox_deficiencia'/>
    <label htmlFor="deficiencia">deficiência</label>

    <input type="radio" name="sexo" id="sexo_masculino" value="masculino" />
    <label htmlFor="sexo_masculino">masculino</label>
    <input type="radio" name="sexo" id="sexo_feminino" value="feminino" />
    <label htmlFor="sexo_masculino">masculino</label>
    <br />
    <input type="number" placeholder='idade mínima'/>
    <input type="number" placeholder='idade máxima'/>
    <br />
    <input type="number" placeholder='salário mínimo'/>
    <input type="number" placeholder='salário máximo'/>
  </main>
}

export default Selecao
