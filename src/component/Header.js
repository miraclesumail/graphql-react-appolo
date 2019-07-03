import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div >
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Hacker News</div>
          <Link to="/snake" className="ml1 no-underline black">
            snake
          </Link>
          <div className="ml1">|</div>
          <Link to="/create">
            submit
          </Link>
          
          <button onClick={() => this.props.history.push('/music')}>to music</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
//export default Header