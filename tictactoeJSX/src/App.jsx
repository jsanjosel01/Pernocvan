import { TURNS, WINNER_COMBOS } from "./constants.js"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

import Square from "./components/Square.jsx"
import WinnerModal from "./components/WinnerModal.jsx"
import { checkWinner } from "./logic/board.js"


function App() {

  //Ejercicio de animación del ratón
  const [enabled, setEnabled] = useState(false) //Un estado inicialmente está a falso.

  // New state to control the animation position
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {

    // Function to get mouse position and set in our animation ball
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })      
    }
    
    if (enabled) {
    // We are subscribing from the pointermove event
      window.addEventListener('pointermove', handleMove)
    }

    // Clean up the event when:
    // - The component unmounted
    // - When dependencies change
    return () => {
	    // We are unsubscribing from the pointermove event
      window.removeEventListener('pointermove', handleMove)
    }
  },[enabled]) //Se ejecuta cuando le das al btn






  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn , setTurn] = useState(TURNS.X)
  const [winner , setWinner] = useState(null)

  // Hook: useEffect dos formas de hacerlo:

  // function ejemplo(){
  //   console.log("Consulta a base de datos")
  // }

  // useEffect(() => {ejemplo}, [])

  useEffect(() => {
    console.log("Consulta a base de datos")
  }, [turn])


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) =>{
	  
    if(board[index] || winner) return

    const newBoard = [...board]
	  newBoard[index] = turn
	  setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
      <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">

      {
        board.map((_, index)=>{
          return (
             <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
           >
             {board[index]}
            </Square>
            
          )
        })
      }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>


      <div style={{
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid #fff',
      borderRadius: '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left: -25,
      top: -25,
      width: 50,
      height: 50,
       transform: `translate(${position.x}px, ${position.y}px)`
      }} />

      {/* Bnt de animación ratón */}
      <button onClick={() => {setEnabled(!enabled)}}>
        { enabled ? 'Disable' : "Enable"}
      </button>

    </main>
  )
}

export default App
