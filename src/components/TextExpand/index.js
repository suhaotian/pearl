import React, { Component, PropTypes } from 'react'
//import styles from './style.css'

class TextExpand extends Component {
  
  state = {
    showLength: this.props.text.length
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {
    this.handleExpand(this._el, this.props.showLines)
  }

  getFloat = (obj, field) => {
    return parseFloat(obj[field].replace('px', ''))
  }

  handleExpand = (el, x) => {
    const styles = window.getComputedStyle(el)
    const fontSize = this.getFloat(styles, 'fontSize')

    let lh = this.getFloat(styles, 'lineHeight')
    lh = lh >= 2 ? lh : fontSize*lh

    const show_total = (this.getFloat(styles, 'width')/(fontSize*0.5))*x
    if (this.getFloat(styles, 'height')/lh <= x || show_total > this.props.text.length) return

    this.setState({
      showLength: show_total- 8
    })
  }

  render() {
    let More = null
    let handleClick = () => {}
    if (this.state.showLength !== this.props.text.length) {
      More = <span>... {this.props.more}</span>
      handleClick = () => {
        this.setState({showLength: this.props.text.length})
      }
    }

    return (
      <div ref={c => {this._el = c}} >
        {this.props.text.slice(0, this.state.showLength)}
        {this.state.showLength !== this.props.text.length ? <span onClick={handleClick}>... {More}</span> : null}
      </div>
    )
  }
}

TextExpand.defaultProps = {
  more: 'more',
}

TextExpand.propTypes = {
  text: PropTypes.string.isRequired,
  showLines: PropTypes.number.isRequired,
  more: PropTypes.any.isRequired,
}

export default TextExpand 