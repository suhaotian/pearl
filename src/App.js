import React, { Component } from 'react'
import {
  BrowserRouter, 
  Match, 
  Miss,
} from 'react-router'
import { routes } from './routes'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    )
  }
}
