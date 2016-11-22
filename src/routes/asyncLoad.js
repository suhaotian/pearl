import React, { Component } from 'react'


export default function asyncLoad(cb) {
  return class AsyncComponent extends Component {
    state = { component: null }

    componentDidMount() {
      if (!this.state.component) {
        cb(component => {
          this.setState({ component: component.default })
        })
      }
    }

    render() {
      const Component = this.state.component
      if (Component) {
        return <Component {...this.props} />
      }
      return null  // Or loading effect component here ?
    }
  }
}

// export function asyncLoadHOF(component) {  // HOF => High Order Function
//   return asyncLoad((cb) => {
//     require.ensure([], (require) => {
//       cb(require(component))
//     })
//   })
// }

