import React from 'react';

import ship from '../assets/space-ship.png';

function Ship({top, left}) {
//   const [top, setTop] = useState(parseInt(localStorage.getItem('top')) || 700 );
//   const [left, setLeft] = useState(parseInt(localStorage.getItem('left')) || 0);

//   const navigateToThePoint = (val) => {
//     // get the current position
//     const y = (nuOfRows * 100 - top) / 100;
//     const x = ( left + 100 ) / 100;
    
//     // if on a odd row
//     if(y%2) {
//       if(x + val <= nuOfCols) {
//         setLeft(left + val*100);
//       } else {
//         setTop(top - 100);
//         setLeft((nuOfCols - ( x + val - nuOfCols )) * 100);
//       }
//     } else {
//       // if on a even row
//       if(val < x) {
//         setLeft(left - val*100);
//       } else {
//         setTop(top - 100);
//         setLeft((val - x) * 100);
//       }
//     }
//   }

  return (
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
    }} />
  )
}

export default Ship;