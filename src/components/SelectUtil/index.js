import React, { Component } from 'react'

export default class SelectUtil extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: props.current,
      data: props.data,
    }
  }



  handleClick(i) {
    this.setState({current: i})
    this.onChange(i)
  }

  componentWillReceiveProps({current, data}) {
    if (
      this.state.current !== nextProps.current ||
      this.state.data !== nextProps.data
    ) {
      this.setState({current, data})
    }
  }


  render() {
    const {
      current, data, 
      style, className, 
      keyField, activeClassName, activeStyle, 
      component, children,
      ...other,
    } = this.props

    return (
      <div>
        {
          this.state.data.map((item, i) => {
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
}