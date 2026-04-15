import { create } from 'zustand'

// Definimos la interfaz con los estados y acciones
interface BearState {
  bears: number
  food: string
  type: string
  increasePopulation: () => void
  feed: (food: string) => void // Una función
}

// Por convención los hooks de store se nombran useXStore
// create es la función importada desde zustand que crea la store.
// create recibe una función que recibe helpers para actualizar el estado. 
//    El más común es set.
// La función feed recibe un string food y se ejecuta " => set(() => ({ food })) " 
//    donde set actualiza el estado food. Sería equivalente a poner:
//    feed: (food) => set(() => ({ food: food }))
export const useBearStore = create<BearState>()((set) => ({
  bears: 2,
  food: 'honey',
  type: 'black',
  increasePopulation: () => set((prev) => ({bears:prev.bears +1})),
  feed: (food: string) => set(() => ({ food })),
}))