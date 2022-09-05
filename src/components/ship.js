import React from 'react';
import { useState, useEffect } from 'react';

import ship_1 from '../assets/ships//space-ship.png';
import ship_2 from '../assets/ships//space-ship-1.png';
import ship_3 from '../assets/ships//space-ship-2.png';
import ship_4 from '../assets/ships//space-ship-3.png';
import ship_5 from '../assets/ships//space-ship-4.png';
import ship_6 from '../assets/ships//space-ship-5.png';

const ships = [ship_1, ship_2, ship_3, ship_4, ship_5, ship_6]

const Ship = React.memo(function({turn, nuOfRows, nuOfCols, index}) {

    const [top, setTop] = useState(parseInt(localStorage.getItem(`top-${index}`)) || 700 );
    const [left, setLeft] = useState(parseInt(localStorage.getItem(`left-${index}`)) || 0);

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

    useEffect(()=>{
        localStorage.setItem(`top-${index}`, top);
        localStorage.setItem(`left-${index}`, left);
     },[top, left, index]);


    useEffect(()=>{
        //console.log('in turn')
        if(turn.val) {
            navigateToThePoint(turn.val);
        }
     },[turn]);


  return (
    <div style={{ 
        top: `${top}px`,
        left: `${left}px`,
        position: 'absolute',
        backgroundImage: `url(${ships[index]})`,
        backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
        width: '100px', 
        height: '100px' 
    }} />
  )
})

export default Ship;