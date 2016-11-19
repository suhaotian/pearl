import React, { Component } from 'react'
import Router from 'react-router/HashRouter'
// import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'

import { routes } from './routes'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {
            routes.map((item, i) => (
              <Match 
                key={i}
                pattern={item.path}
                exactly={item.exactly}
                component={item.load}
              />
            ))
          }

          <Miss
            render={props => (
              <div>Nothing Here. 404.</div>
            )}
          />
        </div>
      </Router>
    )
  }
}
