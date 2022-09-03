import { useState, useEffect } from 'react';

import { Board, Ship } from './components';
import { getrandomNumber } from './helpers/randomNumberHelper';

function App() {

  const [turn, setTurn] = useState(0);

  console.log('heeyy')

  const nuOfRows = 8;
  const nuOfCols = 8;
  const numOfShips = 3;


  const memeZoneGenerator = () => {
    const min = 2;
    const max = nuOfRows * nuOfCols - 1;
    return [...Array(12)].map(() => getrandomNumber(min, max));
  }

  const memeArray = JSON.parse(localStorage.getItem('memeArray')) || memeZoneGenerator();

  useEffect(()=>{
    localStorage.setItem('memeArray', JSON.stringify(memeArray));
  },[JSON.stringify(memeArray)]);

  const gettheTurn = () => {
    return getrandomNumber(1, 6);
  }

  return (
    <div>
      <main>
        <Board nuOfRows={nuOfRows} nuOfCols={nuOfCols} memeArray={memeArray}>
          {/* {[...Array(numOfShips)].map((val, index) =>   <Ship nuOfRows={nuOfRows} nuOfCols={nuOfCols} turn={{val:turn}} index={index} /> )} */}
        </Board>

        <button onClick={() => {
          const newTurn = gettheTurn();
          setTurn(newTurn);
        }}>here</button>
        <span>{turn}</span>
      </main>  
    </div>
  )
}

export default App;
