import React, { Component } from 'react'
import LinkList from './component/LinkList'
import CreateLink from './component/CreateLink'
import Music from './component/Music'
import Header from './component/Header'
import { Switch, Route } from 'react-router-dom'


class App extends Component {

  
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/music" component={Music} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
