import React, { Component } from 'react'
import LinkList from './component/LinkList'
import CreateLink from './component/CreateLink'
import Music from './component/Music'
import Header from './component/Header'
import Snake from './component/Snake'
import { withRouter } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route } from 'react-router-dom'
import Loadable from "react-loadable"

//Loadable.preloadAll

const routeConfig = [
    {
        path: '/',
        exact: true,
        component: Loadable({
          loader: () => import('./component/LinkList'),
          loading: () => <div />
        })   
    },
    {
        path: '/create',
        exact: true,
        component: Loadable({
          loader: () => import('./component/CreateLink'),
          loading: () => <div />
        })
    },
    {
        path: '/music',
        exact: true,
        component: Loadable({
          loader: () => import('./component/Music'),
          loading: () => <div />
        }),
        //delay: 1000
    }, 
    {
        path: '/snake',
        exact: true,
        component: Loadable({
          loader: () => import('./component/Snake'),
          loading: () => <div />
        })      
    },
    {
      path: '/touch',
      exact: true,
      component: Loadable({
        loader: () => import('./component/Touch'),
        loading: () => <div />
      })      
    }
]

class App extends Component {

  render() {
    const location = this.props.location;
    console.log(this.props.location, '我我哦哦哦哦哦哦哦哦哦哦哦哦哦');
    const className = this.props.history.action == 'PUSH' ? 'fade' : 'fade1'
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
           <TransitionGroup>
              <CSSTransition key={location.pathname} timeout={1000} classNames={className}         
                  onExit={node => {      
                         console.log(className, '嘻嘻嘻嘻嘻嘻');
                  }}
              >
                  <Switch>
                    {
                       routeConfig.map((item, index) => (
                           <Route key={index} exact={item.exact} path={item.path} component={item.component}/>
                       ))
                    }
                    {/* <Route exact path="/" component={props => {
                          return <LinkList/>
                    }} />
                    <Route exact path="/create" component={props => {
                          return <CreateLink/>
                    }} />
                    <Route exact path="/music" component={props => {
                          return <Music {...props}/>
                    }} />
                    <Route exact path="/snake" component={Snake} /> */}
                  </Switch>
              </CSSTransition>
           </TransitionGroup>       
        </div>
      </div>
    )
  }
}

export default withRouter(App)
