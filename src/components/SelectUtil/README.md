# Demo

```jsx
import React, { Component } from 'react'
import SelectUtil from 'components/SelectUtil'

const data = [1, 2, 3, 4]

export class Demo extends Component {
  state = {
    current: 0,
  }

  handleChange(v) {
    console.log(v)
  }

  render() {
    return (
      <SelectUtil 
        data={data}
        current={this.state.current}
        activeStyle={{color: 'red'}}
        activeClassName={"active"}
        onChange={(v) => {this.handleChange(v)}}
      >
        { (item) => (item) }
      </SelectUtil> 
    )
  }
}

// <Demo />

```