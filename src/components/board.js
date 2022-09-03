import React from 'react';

import space from '../assets/space.png';
import one from '../assets/memes/1.jpg';
import two from '../assets/memes/2.jpg';
import three from '../assets/memes/3.jpg';
import four from '../assets/memes/4.jpg';
import five from '../assets/memes/5.jpg';
import six from '../assets/memes/6.jpg';
import seven from '../assets/memes/7.jpg';
import eight from '../assets/memes/8.jpg';
import nine from '../assets/memes/9.jpg';
import ten from '../assets/memes/10.jpg';
import eleven from '../assets/memes/11.jpg';
import tweleve from '../assets/memes/12.jpg';

const memes = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, tweleve];

const Board = React.memo(function({nuOfRows, nuOfCols, memeArray,  children}) {

    let zones = [];

    for (let i = nuOfRows; i > 0; i--) {
        const col = [];
        for (let j = 0; j < nuOfCols; j++) { 
          const x = i*nuOfCols - j;
          const memeIndex = memeArray.indexOf(x);
          const meme = !!memeIndex ? memes[memeIndex]  : null; 
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

    return (
        <div className="grid grid-cols-8 gap-0 relative" style={
            {width: '800px',
            height: '800px',
            backgroundImage: `url(${space})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            {zones}
            {children}
        </div>
    )
});

export default Board;