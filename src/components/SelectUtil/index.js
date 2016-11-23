import React, { Component } from 'react'

export default class SelectUtil extends Component {

  state = {
    current: this.props.current,
  }

  componentWillReceiveProps({current}) {
    if (
      this.state.current !== current
    ) {
      this.setState({current})
    }
  }

  handleClick(i) {
    if (i === this.state.current && !this.props.forceUpdate) return
    this.setState({current: i})
    this.props.onChange(i)
  }

  render() {
    const {
      current, data, 
      style, className, forceUpdate,
      keyField, activeClassName, activeStyle, 
      component, children,
      ...other,
    } = this.props

    return (
      <div>
        {
          this.props.data.map((item, i) => {
            let key = keyField ? item[keyField] : i
            let finalStyle = style
            let finalClassName = className
            if (this.state.current === key) {
              finalStyle = {...style, ...activeStyle}
              finalClassName = `${className ? className + ' ' : ''}${activeClassName ? activeClassName : ''}`
            }

            return (
              <this.props.component 
                key={key} 
                onClick={() => {
                  this.handleClick(key)
                }}
                style={finalStyle}
                className={finalClassName}
                {...other}
              >{children(item)}</this.props.component>
            )
          })
        }
      </div>
    )
  }
}

SelectUtil.defaultProps = {
  component: 'div',
  onChange: function() {},
  forceUpdate: false,  // If current with click is same, don't call setState
}