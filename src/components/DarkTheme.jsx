import React from 'react';
import { useState } from 'react';
const DarkTheme = () => {
    const [change, setChange] = useState(true)
    const dark = () =>{
        setChange(!change) 
        if(change === true){
            document.body.style.background = 'radial-gradient(#53388F, #2F2958)',
            document.body.style.color = 'aliceblue',
            document.getElementsByClassName('card')[0].style.background = 'linear-gradient(#5836B3 0% , #5936B4 9.1%, #362A84 100%)',
            document.getElementsByClassName('card')[0].querySelector('button').style.backgroundColor = '#7D69F1'
            // document.body.style.backgroundRepeat = 'no-repeat'
        }
        else{
            document.body.style.background = 'radial-gradient(#D5F3FF, var(--first-color))',
            document.body.style.color = 'var(--text-color)',
            document.getElementsByClassName('card')[0].style.background = 'linear-gradient(#e5f2ff97, #d5f3ff94 97.4%)',
            document.getElementsByClassName('card')[0].querySelector('button').style.backgroundColor = 'var(--button-color)'
            // document.body.style.backgroundRepeat = 'no-repeat'
        }
    }
    return (
        <div>
    <label className="switch">
    <input type="checkbox" onChange={dark}/>
    <span className="slider"></span>
    </label>
        </div>
    );
};

export default DarkTheme;