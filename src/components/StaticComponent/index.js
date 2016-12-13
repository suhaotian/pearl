import React, { Component } from 'react'
//import styles from './style.css'

class StaticComponent extends Component {
  
  // state = {}
  static defaultProps = {
    component: 'div'
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  // componentDidMount() {}

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}

  render() {
    let {component: Component, children, ...other} = this.props
    return (
      <Component {...other}>
        {children}
      </Component>
    )
  }
}

// StaticComponent.defaultProps = {}

// StaticComponent.propTypes = {}

export default StaticComponent