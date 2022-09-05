import { useState, useEffect, useRef } from 'react';

import { Board, Ship } from './components';
import { getrandomNumber } from './helpers/randomNumberHelper';

const nuOfRows = 8;
const nuOfCols = 8;
const numOfShips = 2;

function App() {

  const [turn, setTurn] = useState(0);
  const [whichShip, setWhichShip] = useState(parseInt(localStorage.getItem('whichShip')) || 0);
  const [position, setPosition] = useState(JSON.parse(localStorage.getItem('position')) || {0:1, 1:1});
  let rules = useRef({0:null, 1: null});
  //('rules', rules);
  //console.log('position', position);

  const memeZoneGenerator = () => {
    const min = 2;
    const max = nuOfRows * nuOfCols - 1;
    const memeZones = [];

    do {
      let rand = getrandomNumber(min, max);
      if(memeZones.indexOf(rand)===-1) {
        memeZones.push(rand)
      }
    } while (memeZones.length < 12);

    return memeZones;
  }

  const memeArray = JSON.parse(localStorage.getItem('memeArray')) || memeZoneGenerator();
  //console.log(memeArray);

  useEffect(()=>{
    localStorage.setItem('memeArray', JSON.stringify(memeArray));
    localStorage.setItem('whichShip', whichShip);
  },[memeArray, whichShip]);

  const gettheTurn = () => {
    return getrandomNumber(1, 6);
  }

  useEffect(()=>{

    //console.log(position)
    for (const [key, value] of Object.entries(position)) {
      const whichMeme = memeArray.indexOf(value);
      if(whichMeme !==-1 ){
        console.log('in a meme zone', rules.current)
        // if any spaceship in a memezone - do something
        switch(whichMeme) {
          case 1:
            for (let key of Object.keys(rules.current)) {
              rules.current[key] = 'SKIP_NEXT_TURN';
            }
            rules.current = {...rules.current, [key]: 'EXTRA_TURN'};
            break;
          case 2:
          case 4:
            rules.current = {...rules.current, [key]: 'SKIP_NEXT_TURN'};
            break;
          case 5:
            rules.current = {...rules.current, [key]: 'NEXT_TURN_6'};
            break;
          case 6:
            rules.current = {...rules.current, [key]: 'NEXT_TURN_1'};
            break;
          case 7:
            rules.current = {...rules.current, [key]: 'SKIP_NEXT_2_TURN'};
            break;
          case 8:
            for (let key of Object.keys(rules.current)) {
              rules.current[key] = 'EXTRA_TURN';
            }
            rules.current = {...rules.current, [key]: 'SKIP_NEXT_TURN'};
            break;
          case 9:
            for (let key of Object.keys(rules.current)) {
              rules.current[key] = 'SKIP_NEXT_TURN';
            }
            rules.current = {...rules.current, [key]: 'EXTRA_TURN'};
            break;
          case 10:
            rules.current = {...rules.current, [key]: 'NEED_6'};
            break;
          case 11:
              rules.current = {...rules.current, [key]: 'NO_1'};
              break
          default:
        };
      }
    }

    // check meme array
    localStorage.setItem('position', JSON.stringify(position));

  },[position]);

  const executeTurn = (val) => {
    let newTurn;
    if(val!==undefined) {
      newTurn = val;
    } else {
      newTurn = gettheTurn();
    }

    console.log(`${whichShip}-${newTurn}`)

    setTurn(newTurn);
    setPosition({...position, [whichShip]: position[whichShip]+newTurn})
  }

  const updateShip = () => {
    if(whichShip < numOfShips-1) {
      setWhichShip(whichShip + 1);
    } else {
      setWhichShip(0);
    }
  }

  return (
    <div>
      <main>
        <Board nuOfRows={nuOfRows} nuOfCols={nuOfCols} memeArray={memeArray}>
          {[...Array(numOfShips)].map((val, index) =>   <Ship 
            nuOfRows={nuOfRows} 
            nuOfCols={nuOfCols} 
            turn={whichShip === index ? {val:turn} : {val: null}} 
            index={index} 
          /> )}
        </Board>

        <button onClick={() => {
          //console.log(whichShip)

          if(rules.current[whichShip]) {
            console.log(rules.current[whichShip]);
            
            switch(rules.current[whichShip]) {
              case 'SKIP_NEXT_TURN':
                console.log('skipping');
                executeTurn(0);
                updateShip();
                break
              case 'EXTRA_TURN':
                executeTurn();
                updateShip();
                break;
              case 'NEXT_TURN_6':
                executeTurn(6);
                updateShip();
                break;
              case 'NEXT_TURN_1':
                executeTurn(1);
                updateShip();
                break;
              case 'SKIP_NEXT_2_TURN':
                updateShip();
                break;
              // case 'NEED_6':
              //   for (let key of Object.keys(rules.current)) {
              //     rules.current[key] = 'EXTRA_TURN';
              //   }
              //   rules.current = {...rules.current, [key]: 'SKIP_NEXT_TURN'};
              //   break;
              // case 'NO_1':
              //   for (let key of Object.keys(rules.current)) {
              //     rules.current[key] = 'SKIP_NEXT_TURN';
              //   }
              //   rules.current = {...rules.current, [key]: 'EXTRA_TURN'};
              //   break;
              default:
            };

            rules.current[whichShip] = null;
          } else {
            executeTurn();
            updateShip();
          }
       
        }}>here</button>
        <span>{turn}</span>
      </main>  
    </div>
  )
}

export default App;
