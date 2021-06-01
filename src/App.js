import { useState } from 'react'
import './App.css';

function App() {
  const [position, setPosition] = useState()
  const [squares, setSquares] = useState()
  const [inputError, setInputError] = useState(false)
  const allowedInput = new RegExp(/^[flrFLR]+$/)
  const numToDir = {
    0: 'N',
    1: 'E',
    2: 'S',
    3: 'W'
  }

  const setRoomSize = (e) => {
    e.preventDefault()
    setSquares({x: +e.target[0].value, y: +e.target[1].value})
  }

  const setStartSquare = (e) => {
    e.preventDefault()
    setPosition({x: +e.target[0].value, y: +e.target[1].value, facing: +e.target[2].value})
  }

  const moveRobot = (e) => {
    e.preventDefault()
    setInputError(false)
    const move_input = e.target[0].value

    if(!allowedInput.test(move_input)){
      setInputError(true)
    }else{
      const input_array = Array.from(move_input)
      let pos = {...position}

      input_array.forEach( move => {
        switch (move.toUpperCase()) {
          case 'F':
            switch (pos.facing) {
              case 0:
                if(pos.y < squares.y - 1) pos = {...pos, y: pos.y + 1}
                break;

              case 1:
                if(pos.x < squares.x - 1) pos = {...pos, x: pos.x + 1}
                break;

              case 2:
                if(pos.y > 0) pos = {...pos, y: pos.y - 1}
                break;

              case 3:
                if(pos.x > 0) pos = {...pos, x: pos.x - 1}
                break;
            
              default:
                break;
            }
            break;
          
          case 'L':
            if( pos.facing === 0){
              pos = {...pos, facing: 3} 
            }else{
              pos = {...pos, facing: pos.facing - 1}
            }
            break;

          case 'R':
            if( pos.facing === 3){
              pos = {...pos, facing: 0}
            }else{
              pos = {...pos, facing: pos.facing + 1}
            }
            break;

          default:
            break;
        } 
      })

      setPosition(pos)
    }
  }
 
  return (
    <section className="App">
      <h2>Set room size</h2>
      <form onSubmit={ e => setRoomSize(e) }>
        X:<input type="number" min="0"/>
        Y:<input type="number" min="0"/>
        <button>Set</button>
      </form>
      {squares && <h3>Room size is {squares.x}x{squares.y} squares</h3>}
      <h2>Set starting position:</h2>
      <form onSubmit={ e => setStartSquare(e) }>
        X:<input type="number" min="0"/>
        Y:<input type="number" min="0"/>
        Facing:
        <select>
          <option value="0">N</option>
          <option value="1">E</option>
          <option value="2">S</option>
          <option value="3">W</option>
        </select>
        <button>Set</button>
      </form>
      {position && <h1>Current position: X:{position.x} Y:{position.y} Facing: { numToDir[position.facing] }</h1>}
      <form onSubmit={ e => moveRobot(e) }>
        <input type="text" className="" />
        <button className="">Move</button>
      </form>
      {inputError && <h4 className="error">Sorry, wrong input. Try again</h4>}
    </section>
  );
}

export default App;
