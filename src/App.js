import React, { Component } from 'react'
import Router from 'react-router/HashRouter'
// import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import Miss from 'react-router/Miss'
import { routes, redirectRoutes } from './routes'
import MatchWithTransition from 'components/MatchWithTransition'

import 'api'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="mobile-page">
          {
            routes.map((item, i) => (
              <MatchWithTransition
                key={i} 
                pattern={item.path}
                exactly={item.exactly}
                component={item.load}
              />
            ))
          }

          {
            redirectRoutes.map(({from, to}, i) => (
              <Match key={i} exactly pattern={from} render={() => (
                <Redirect to={to} />
              )}/>
            ))
          }

          <Miss
            render={props => (
              <div style={{textAlign: 'center', paddingTop: '1em'}}>Nothing Here. 404.</div>
            )}
          />
        </div>
      </Router>
    )
  }
}
