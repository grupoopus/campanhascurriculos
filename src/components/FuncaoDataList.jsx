
import React from 'react'

const funcaoDataListArr = ['Motorista',
  'Assistente Administrativo',
  'Advogado',
  'Estagiário',
  'Auxiliar de Produção',
  'Enfermeiro',
  'Jardineiro',
  'Auxiliar Administrativo',
  'Analista Financeiro',
  'Motorista Truck',
  'Motorista de Caminhão',
  'Motorista de Ônibus',
  'Vendedor',
  'Assistente Financeiro',
  'Motorista de Van',
  'Projetista',
  'Atendente',
  'Recepcionista',
  'Motorista Carreteiro',
  'Vigilante',
  'Analista Administrativo',
  'Operador de Máquinas',
  'Auxiliar de Serviços Gerais',
  'Analista de Qualidade',
  'Assistente Administrativo Financeiro',
  'Assistente de Produção',
  'Porteiro',
  'Enfermeiro Hospitalar',
  'Auxiliar de Logística',
  'Advogado Civilista',
  'Analista Comercial',
  'Técnico de Enfermagem',
  'Assistente Comercial',
  'Auxiliar de Escritório',
  'Repositor de Mercadorias',
  'Caixa',
  'Vendedor Externo',
  'Almoxarife',
  'Operador de Produção',
  'Entregador',
  'Operador de Caixa',
  'Programador',
  'Estoquista',
  'Autônomo',
  'Projetista Mecânico',
  'Sócio Proprietário',
  'Vendedor Interno',
  'Assistente Jurídico',
  'Servente de Obras',
  'Motoboy',
  'Inspetor de Qualidade',
  'Operador de Empilhadeira',
  'Motorista de Automóveis',
  'Manobrista',
  'Gerente Administrativo',
  'Secretária',
  'Motorista '
]

const FuncaoDataList = () => <datalist id="funcao_list">
  {
    funcaoDataListArr.map((el, idx) => <option key={idx} value={el}></option>)
  }
</datalist>

export default FuncaoDataList
