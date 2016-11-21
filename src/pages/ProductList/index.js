import React, { Component } from 'react'

export default class ProductList extends Component {

  render() {
    return (
      <div>
        List: 
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}

