import { useBearStore } from "../stores/bearStore"


function Bear() {
  // Nos suscribimos (nos ponemos a escuchar) a los valores y acciones que nos 
  // interese de la store
  const bears = useBearStore(state => state.bears)
  const food = useBearStore(state => state.food)
  const feed = useBearStore(state => state.feed)
  
  // Podríamos suscribirnos a todo simplemente con:
  const state = useBearStore()
  
  // Zustand solo vuelve a renderizar un componente cuando cambia la
  // parte del estado que ese componente está escuchando.
  // Por eso si cambiase type (que no lo escuchamos), no se re-renderiza

	return (
    <div>
      <p>Osos: {state.bears}</p>
      <p>Comida: {food}</p>
      <button onClick={() => feed('berries')}>Dar de comer</button>
    </div>
  )
}

export default Bear