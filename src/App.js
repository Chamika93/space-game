import { useState, useEffect, useRef } from 'react';

import { Board, Ship } from './components';
import { gettheTurn } from './helpers/randomNumberHelper';
import { memeZoneGenerator } from './components/board';

import ship_1 from './assets/ships//space-ship.png';
import ship_2 from './assets/ships//space-ship-1.png';
import ship_3 from './assets/ships//space-ship-2.png';
import ship_4 from './assets/ships//space-ship-3.png';
import ship_5 from './assets/ships//space-ship-4.png';
import ship_6 from './assets/ships//space-ship-5.png';

const ships = [ship_1, ship_2, ship_3, ship_4, ship_5, ship_6];

const nuOfRows = 8;
const nuOfCols = 8;
const numOfShips = 2;

function App() {

  const [whichShip, setWhichShip] = useState(parseInt(localStorage.getItem('whichShip')) || 0);
  const [position, setPosition] = useState(JSON.parse(localStorage.getItem('position')) || {0:1, 1:1}); 
  const [turnValue, setTurnValue] = useState(null);
  const memeArray = JSON.parse(localStorage.getItem('memeArray')) || memeZoneGenerator(nuOfRows, nuOfCols);
  let rules = useRef({0:null, 1: null});

  useEffect(()=>{
    localStorage.setItem('memeArray', JSON.stringify(memeArray));
    localStorage.setItem('whichShip', whichShip);
  },[memeArray, whichShip]);


  useEffect(()=>{
    localStorage.setItem('position', JSON.stringify(position));
  },[position]);

  const executeTurn = () => {

    let turnVal;
    // rule checker
    switch(rules.current[whichShip]) {
      case 'NEXT_TURN_6':
        turnVal = 6;
        rules.current[whichShip] = null;
        break;
      case 'NEXT_TURN_1':
        turnVal = 1;
        rules.current[whichShip] = null;
        break;
      default:
    };

    const newTurn = turnVal ? turnVal : gettheTurn();
    console.log(`ship ${whichShip === 0 ? 'grey' : 'yellow'} - turn ${newTurn} - rules - ${rules}`);
  
    if(rules.current[whichShip] === 'NEED_6') {
      rules.current[whichShip] = null;
      if(newTurn !== 6) {
        console.log('not a 6 going for next player')
        return;
      }
    }

    if(rules.current[whichShip] === 'NO_1') {
      rules.current[whichShip] = null;
      if(newTurn === 1) {
        console.log('It is a 1 going for next player')
        return;
      }
    }

    setTurnValue(newTurn);

    const newPosition = position[whichShip]+newTurn;
    console.log(`newPosition ${newPosition}`);
    if(newPosition > 64) {
      return;
    }

    setPosition({...position, [whichShip]: newPosition})
    
    // execute rules here
    const whichMeme = memeArray.indexOf(newPosition);
    if(whichMeme !==-1 ){
      // if any spaceship in a memezone - do something
      switch(whichMeme) {
        case 0:
          setPosition({...position, [whichShip]: newPosition - newTurn})
          break;
        case 1:
          rules.current = {...rules.current, [whichShip]: 'EXTRA_TURN'};
          break;
        case 3:
          setPosition({...position, [whichShip]: position[whichShip]+ 8});
          break;
        case 2:
        case 4:
          rules.current = {...rules.current, [whichShip]: 'SKIP_NEXT_TURN'};
          break;
        case 5:
          rules.current = {...rules.current, [whichShip]: 'NEXT_TURN_6'};
          break;
        case 6:
          rules.current = {...rules.current, [whichShip]: 'NEXT_TURN_1'};
          break;
        case 7:
          rules.current = {...rules.current, [whichShip]: 'SKIP_NEXT_2_TURN'};
          break;
        case 8:
          for (let key of Object.keys(rules.current)) {
            rules.current[key] = 'EXTRA_TURN';
          }
          rules.current = {...rules.current, [whichShip]: 'SKIP_NEXT_TURN'};
          break;
        case 9:
          setWhichShip(whichShip - 1);
          break;
        case 10:
          rules.current = {...rules.current, [whichShip]: 'NEED_6'};
          break;
        case 11:
            rules.current = {...rules.current, [whichShip]: 'NO_1'};
            break
        default:
      };
    }
  }

  const getNextShip = (ship) => {
    const nextship = (ship === numOfShips-1 ) ? 0 : ship + 1;
    return nextship;
  }

  const updateShip = () => {
    console.log('rules', rules.current);

    if(rules.current[whichShip] === 'EXTRA_TURN'){
      rules.current[whichShip] = null;
    } else {

      let nextship = getNextShip(whichShip);

      console.log('here next ship', nextship)
 
      switch(rules.current[nextship]) {
        case 'SKIP_NEXT_TURN':
          console.log('skip turn')
          rules.current[nextship] = null;
          nextship = getNextShip(nextship);
          break;

        case 'SKIP_NEXT_2_TURN':
            nextship = getNextShip(nextship);
            rules.current[nextship] = 'SKIP_NEXT_TURN';
            break;

        default:
       
      };
      setWhichShip(nextship);
    }
 
  }

  return (
    <div>
      <main>
        <div className='flex'>
          <Board nuOfRows={nuOfRows} nuOfCols={nuOfCols} memeArray={memeArray}>
            {[...Array(numOfShips)].map((val, index) =>   <Ship 
              position = { position[index] }
              index={index} 
            /> )}
          </Board>
          <div className='flex items-center  h-[150px] ml-8 mt-12'>
            <div>
              {Object.values(position).map((pos, index) => {
                if(pos===64) {
                  return (
                    <div className='flex items-center  h-[150px]'>
                      <span className="mx-6 bold text-xl">Player</span>

                      <div style={{ 
                            backgroundImage: `url(${ships[index]})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: '100px', 
                            height: '100px' 
                      }} />

                      <span className="mx-6 bold text-xl">has completed</span>
                    </div>
                  )
                } else {
                  return <></>
                }
              })}
            </div>
          </div>
        </div>

        <div className='pt-6 pl-6'>
          <div className='flex items-center h-[150px]'>
            <span className="mx-6 bold text-xl">Next Player</span>

            <div style={{ 
                  backgroundImage: `url(${ships[whichShip]})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '100px', 
                  height: '100px' 
            }} />

            <button className="ml-6 bg-blue-500 h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
              // get the turn
              // update the position of the ship
              executeTurn();
              updateShip();

            }}>Click here to Roll</button>
            <span className='mx-6 bold text-3xl'>{turnValue}</span>
          </div>
        </div>
      </main>  
    </div>
  )
}

export default App;
