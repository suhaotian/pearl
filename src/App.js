import React, { Component } from 'react'
import Router from 'react-router/HashRouter'
// import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import { routes } from './routes'
import styles from './index.css'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="root">
          {
            routes.map((item, i) => (
              <Match
                key={i} 
                pattern={item.path}
                exactly={item.exactly}
                component={item.load}
                className={styles.page}
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
