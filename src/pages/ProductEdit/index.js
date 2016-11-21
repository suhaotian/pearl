import React, { Component } from 'react'

export default class ProductEdit extends Component {

  render() {
    return (
      <div>
        edit: 
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}

