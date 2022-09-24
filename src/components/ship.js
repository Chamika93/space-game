import React from 'react';

import ship_1 from '../assets/ships//space-ship.png';
import ship_2 from '../assets/ships//space-ship-1.png';
import ship_3 from '../assets/ships//space-ship-2.png';
import ship_4 from '../assets/ships//space-ship-3.png';
import ship_5 from '../assets/ships//space-ship-4.png';
import ship_6 from '../assets/ships//space-ship-5.png';

const ships = [ship_1, ship_2, ship_3, ship_4, ship_5, ship_6]

const Ship = React.memo(function({ position, index}) {
   // convert position to x, y
   const x = ( ( position - 1 ) % 8 ) + 1 ;
   const y = Math.floor( ( position - 1 ) / 8 ) + 1;

   // convert x, y in to top, left
   const top = ( 8 * 100 ) - 100*y;
   let left;

   if(y%2) {
    left = ( 100 * x ) - 100; 
   } else {
    left = 800 - 100*x;
   }


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