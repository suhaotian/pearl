import React, { Component, PropsType } from 'react'
//import styles from './style.css'

class FetchData extends Component {
  
  state = {
    isFetching: true,
    result: {}
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {

  }

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}

  render() {
    let {isFetching, result} = this.state
    if (isFetching) return <div>fetching</div>
    if (result.status !== 'ok') return <div>fetching failed</div>
    
    return this.props.children(result)
  }
}

FetchData.defaultProps = {}

FetchData.propTypes = {
  children: PropsType.func.isRequired
}

export default FetchData