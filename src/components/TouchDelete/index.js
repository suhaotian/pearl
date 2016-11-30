import React, { Component, PropTypes } from 'react'

class TouchDelete extends Component {
  static defaultProps = {
    currentX: 0,
  }

  static propTypes = {
    len: PropTypes.number.isRequired,
    currentX: PropTypes.number,
  }

  state = {
    x: this.props.currentX,
    hasTransition: false,
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  // componentDidMount() {}

  // componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.currentX !== nextProps.currentX) {
      this.setState({x: nextProps.currentX})
    }
  }

  handleTouchStart = (e) => {
    this.x = e.touches[0].pageX - this.state.x
  }

  handleTouchMove = (e) => {
    this.currentX = e.touches[0].pageX
    this.v = this.currentX - this.x
    this.setState({x: this.v, hasTransition: false})
  }

  handleTouchEnd = (e) => {
    if (this.v > 0 || this.v > this.props.len/2) {
      this.setState({x: 0, hasTransition: true})
    } else if (this.v < 0){
      this.setState({x: this.props.len, hasTransition: true})
    }
  }

  render() {
    const {hasTransition, x} = this.state
    const style = {
      position: 'relative',
      WebkitTransform: `translateX(${x}px)`,
      transform: `translateX(${x}px)`,
    }
    if (hasTransition) {
      style['transition'] = 'transform .2s ease'
      style['WebkitTransition'] = 'transform .2s ease'
    }
    return (
      <div 
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchEnd}
        style={style}
      >
        {this.props.children}
      </div>
    )
  }
}

export default TouchDelete