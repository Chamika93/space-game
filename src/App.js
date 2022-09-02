import space from './assets/space.png';
import ship from './assets/space-ship.png';
import one from './assets/memes/1.jpg';
import two from './assets/memes/2.jpg';
import three from './assets/memes/3.jpg';
import four from './assets/memes/4.jpg';
import five from './assets/memes/5.jpg';
import six from './assets/memes/6.jpg';
import seven from './assets/memes/7.jpg';
import eight from './assets/memes/8.jpg';
import nine from './assets/memes/9.jpg';
import ten from './assets/memes/10.jpg';
import eleven from './assets/memes/11.jpg';
import tweleve from './assets/memes/12.jpg';
import { useState, useEffect } from 'react';
import { Board, Ship as Shipp } from './components';

const memes = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, tweleve];

function App() {
  const [top, setTop] = useState(parseInt(localStorage.getItem('top')) || 700 );
  const [left, setLeft] = useState(parseInt(localStorage.getItem('left')) || 0);
  const [turn, setTurn] = useState(0);

  const nuOfRows = 8;
  const nuOfCols = 8;

  const getrandomNumber = (min, max) => {
      return min + Math.floor(Math.random() * (max - min + 1));
  };

  const randomNumbergenerator = () => {
    const min = 2;
    const max = nuOfRows * nuOfCols - 1;
    return [...Array(12)].map((val, index) => {
      return {zone: getrandomNumber(min, max), meme: memes[index] }
    });
  }

  const [memeArray, setMemeArray] = useState( JSON.parse(localStorage.getItem('memeArray')) || randomNumbergenerator());

  useEffect(()=>{
     localStorage.setItem('top', top);
     localStorage.setItem('left', left);
     localStorage.setItem('memeArray', JSON.stringify(memeArray));
  },[top, left, memeArray]);

  let zones = [];

  for (let i = nuOfRows; i > 0; i--) {
    const col = [];
    for (let j = 0; j < nuOfCols; j++) { 
      const x = i*nuOfCols - j;
      const meme = memeArray.find(val => val.zone === x)?.meme;    
      col.push(
      <div className='border-2 border-indigo-600' style={ meme ?
        {width: '100%',
        height: '100%',
        backgroundImage: `url(${meme})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        }: {}}/> );
    }
    if (i % 2) {
      col.reverse();
    }
    zones = [...zones, ...col]
  }

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
        <div className="grid grid-cols-8 gap-0 relative" style={
          {width: '800px',
          height: '800px',
          backgroundImage: `url(${space})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          }}>
          {zones}
          <div style={{ 
            top: `${top}px`,
            left: `${left}px`,
            position: 'absolute',
            backgroundImage: `url(${ship})`,
            backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
            width: '100px', 
            height: '100px' 
            }}></div>
        </div>
      </main>

      <button onClick={() => {
        const newTurn = gettheTurn();
        navigateToThePoint(newTurn);
        setTurn(newTurn);
        }}>here</button>
      <span>{turn}</span>
      <Board >
        <Shipp />
      </Board>
    </div>
  )
}

export default App;
