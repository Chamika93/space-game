import { useState, useEffect } from 'react';

import { Board, Ship } from './components';
import { getrandomNumber } from './helpers/randomNumberHelper';

function App() {
  const [top, setTop] = useState(parseInt(localStorage.getItem('top')) || 700 );
  const [left, setLeft] = useState(parseInt(localStorage.getItem('left')) || 0);
  const [turn, setTurn] = useState(0);

  const nuOfRows = 8;
  const nuOfCols = 8;

  const memeZoneGenerator = () => {
    const min = 2;
    const max = nuOfRows * nuOfCols - 1;
    return [...Array(12)].map(() => getrandomNumber(min, max));
  }

  const memeArray = JSON.parse(localStorage.getItem('memeArray')) || memeZoneGenerator();

  useEffect(()=>{
     localStorage.setItem('top', top);
     localStorage.setItem('left', left);
     localStorage.setItem('memeArray', JSON.stringify(memeArray));
  },[top, left, memeArray]);

  const gettheTurn = () => {
    return getrandomNumber(1, 6);
  }

  const navigateToThePoint = (val) => {
    // get the current position
    const y = (nuOfRows * 100 - top) / 100;
    const x = ( left + 100 ) / 100;
    
    // if on a odd row
    if(y%2) {
      if(x + val <= nuOfCols) {
        setLeft(left + val*100);
      } else {
        setTop(top - 100);
        setLeft((nuOfCols - ( x + val - nuOfCols )) * 100);
      }
    } else {
      // if on a even row
      if(val < x) {
        setLeft(left - val*100);
      } else {
        setTop(top - 100);
        setLeft((val - x) * 100);
      }
    }
  }

  return (
    <div>
      <main>
        <Board nuOfRows={nuOfRows} nuOfCols={nuOfCols} memeArray={memeArray}>
          <Ship top={top} left={left} />
        </Board>

        <button onClick={() => {
          const newTurn = gettheTurn();
          navigateToThePoint(newTurn);
          setTurn(newTurn);
        }}>here</button>
        <span>{turn}</span>
      </main>  
    </div>
  )
}

export default App;
