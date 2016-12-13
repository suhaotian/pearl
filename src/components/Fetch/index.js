/* eslint-disable */

import React, { Component } from 'react'
import { GlobalLoading } from 'components/Loading'
import axios, {ajax} from 'api'


class Fetch extends Component {

  state = {
    fetching: true,
    data: null,
    error: null,
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {
    const {method, url, data, config} = this.props
    ajax().then(instance => {
      return instance[method](url, data, {
        cancelToken: new axios.CancelToken((c) => {
          this.cancelFetch = c
        })
      })
    }).then(res => {
      this.setState({
        fetching: false,
        data: res.data,
      })
    })
    .catch(function(e) {
      if (this.willUnmount) return
      this.setState({
        fetching: false,
        error: JSON.stringify(e),
      })
      if (!axios.isCancel(e)) {} 
    })
  }

  componentWillUnmount() {
    this.willUnmount = true
    this.cancelFetch && this.cancelFetch()
  }

  render() {
    let {data, fetching, error} = this.state

    if (fetching) {
      return <GlobalLoading />
    }
    if (data) {
      return this.props.children(data)
    }
    if (error) {
      return <div>{error}</div>
    }
  }
}

Fetch.defaultProps = {
  method: 'get',
}

Fetch.propTypes = {}

export default Fetch