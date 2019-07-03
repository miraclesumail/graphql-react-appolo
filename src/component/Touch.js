import React, { Component, useEffect, useState } from 'react'

// function Circle({active}) {
    
//     useEffect(() => {
//        console.log(active)
       
//     }, [active])

//     return <div className={active ? 'active dot' : 'dot'}>

//     </div>
// }

export class Touch extends Component {
    state = {
        dotPlace: [],
        hasConnected: []
    }

    componentWillMount() {
        this.calculateDots();
    }

    calculateDots = () => {
        // 5x + 3y = 8  .4 1 2.1
        const dotPlace = Array.from({length: 9}).map((item, index) => (
            {
                left: `${.4 + (index % 3)*3.1}rem`,
                top: `${.4 + (index/3 | 0)*3.1}rem`,
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                border: '1px solid yellow',
                position: 'absolute'
            }
        ))
        this.setState({dotPlace})
    }

    render() {
        return (  
              <div className="g-container" onTouchStart={(e) => console.log(e.changedTouches[0])}>
                   {
                       this.state.dotPlace.map((style, index) => (
                           <div style={style}></div>
                       ))
                   }   
              </div>     
        )
    }
}

export default Touch
