import React, { Component } from 'react'
import './styles/snake.css'

let directions = ['up', 'down', 'left', 'right']

export class Snake extends Component {
    static defaultProps = {
         renderLines: [25, 20]
    }

    state = {
         activeGrid:[],
         direction: directions[Math.random()*4 | 0],
         initNum: 3,
         foodAxis: [],
         hasEaten: 0
    }

    timer = null;

    componentWillMount() {
         this.getInitActiveGrid();
         this.generateFoodAxis();
    }

    componentDidMount() {      
         this.movingSnake();
        // this.renderFood();
    }

    generateFoodAxis = () => {
         const [vertical, horizon] = this.props.renderLines;
         const verticalIndex = Math.random()*vertical | 0;
         const horizonIndex = Math.random()*horizon | 0;
         this.setState({foodAxis: [verticalIndex, horizonIndex]})   
    }

    renderFood = () => {
         if(!this.state.foodAxis) return null;
         console.log('我有哟鱼鱼鱼也');
         const [verticalIndex, horizonIndex] = this.state.foodAxis;
         const width = 1/this.props.renderLines[1]*document.body.clientWidth;
         const style = {
              position: 'absolute',
              width,
              height: width,
              left: horizonIndex*width,
              top: verticalIndex*width,
              zIndex: 10,
              background: 'chocolate'
         }
         return <div style={style}>

         </div>
    }

    getInitActiveGrid = () => {
        const { direction, initNum } = this.state;
        console.log(direction, 'directiondirectiondirectiondirectiondirection');
        const [vertical, horizon] = this.props.renderLines;
        let activeGrid = [], horizonIndex, verticalIndex;
        switch (direction) {
              case 'up':
                   horizonIndex = Math.random()*horizon | 0;
                   for(let i = 0; i < initNum; i++) {
                       activeGrid.push([vertical + i, horizonIndex])
                   }  
                   break;
               case 'down':
                   horizonIndex = Math.random()*horizon | 0;
                   for(let i = 1; i <= initNum; i++) {
                       activeGrid.push([-i, horizonIndex])
                   }
                   break;
               case 'left':
                   verticalIndex = Math.random()*vertical | 0;
                   for(let i = 0; i < initNum; i++) {
                       activeGrid.push([verticalIndex, horizon + i])
                   }
                   break; 
               case 'right':
                   verticalIndex = Math.random()*vertical | 0;
                   for(let i = 1; i <= initNum; i++) {
                       activeGrid.push([verticalIndex, -i])
                   }
                   break;       
        }
        console.log(activeGrid, 'activeGridactiveGridactiveGridactiveGrid');
        this.setState({activeGrid})
    }

    movingSnake = () => {
         this.timer = setInterval(() => {
              let { direction, activeGrid } = this.state;
              let leadGrid = activeGrid[0].slice();
              console.log(leadGrid, 'leadGridleadGridleadGridleadGrid');
              switch (direction) {
                    case 'up':
                       leadGrid = [leadGrid[0] - 1, leadGrid[1]];
                       break;
                    case 'down':
                       leadGrid = [leadGrid[0] + 1, leadGrid[1]];
                       break;
                    case 'left':       
                       leadGrid = [leadGrid[0], leadGrid[1] - 1];
                       break;
                    case 'right':       
                       leadGrid = [leadGrid[0], leadGrid[1] + 1];
                       break;   
              }

              for(let i = activeGrid.length - 1; i >= 0; i--) {
                    if(!i)
                       activeGrid[i] = leadGrid;
                    else
                       activeGrid[i] = activeGrid[i - 1];   
              }
              console.log(activeGrid);
              this.setState({activeGrid: activeGrid})
         }, 1000)
    }

    changeDirection = (e) => {
         const { direction } = this.state; 
         const newDirection = e.target.getAttribute('class');
         if(direction == 'up' && newDirection == 'down') return;
         if(direction == 'down' && newDirection == 'up') return;
         if(direction == 'left' && newDirection == 'right') return;
         if(direction == 'right' && newDirection == 'left') return;
         this.setState({direction: newDirection});
    }

    isActiveGrid = (vertical, horizon) => {
         const { activeGrid } = this.state;
         return activeGrid.length && activeGrid.filter(item => item[0] == vertical && item[1] == horizon).length
    }

    renderContainer = () => {
         const { activeGrid } = this.state; 
         const [vertical, horizon] = this.props.renderLines;
         const width = 1/horizon*document.body.clientWidth;
         const style = {width, height: width}

         return  Array.from({length: vertical}).map((item, index) => {
               return Array.from({length: horizon}).map((ele, order) => (
                    this.isActiveGrid(index, order) ? <div style={{...style, background:'pink', border:'1px solid yellow'}}></div> : <div style={style}></div>
               ))
         })
    }
    
    render() {
         return (
            <div>
               <div className="container">
                    {this.renderContainer()} 
                    {this.renderFood()}
               </div>

               <div className="button-container">
                    <div className="left" onClick={this.changeDirection}>左</div>
                    <div className="up" onClick={this.changeDirection}>上</div>
                    <div className="right" onClick={this.changeDirection}>右</div>
                    <div className="down" onClick={this.changeDirection}>下</div>
               </div>
            </div>
         )
    }
}

export default Snake
