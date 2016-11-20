import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    var NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    )
  })
}