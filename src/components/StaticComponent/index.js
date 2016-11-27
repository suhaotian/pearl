import React, { Component } from 'react'
//import styles from './style.css'

class StaticComponent extends Component {
  
  // state = {}

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  // componentDidMount() {}

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}

  render() {
    let {children, ...other} = this.props
    return (
      <div {...other}>
        {children}
      </div>
    )
  }
}

// StaticComponent.defaultProps = {}

// StaticComponent.propTypes = {}

export default StaticComponent