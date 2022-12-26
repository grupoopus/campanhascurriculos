import React from 'react'

const CampanhaNova = () => {
  return <div className="flex flex-row justify-center mt-4">
    <p>nova campanha</p>
  </div>
}
export default CampanhaNova

/*

const [campanha, setCampanha] = useState()

const updateCampanha = useMutation(fetchUpdateCampanhaX, {
  onSuccess: () => {
    queryClient.invalidateQueries(['campanhas', pageNumber])
  }
})

<CampanhaForm
campanha={campanha}
onSave={c => {
  updateCampanha.mutate(c)
  setCampanha()
}}
/>

const fetchUpdateCampanhaX = (data) => fetch(`http://localhost:3004/campanhas/${data.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

*/
