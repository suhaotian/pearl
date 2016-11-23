import React, { Component } from 'react'
import styles from './style.css'

class InputNumber extends Component {
  
  state = {
    value: this.props.value,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value && nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value})
    }
  }

  increase = () => {
    let value = (this.state.value === '' ? 0 :this.state.value)
    let tmpValue = value + this.props.step
    if (tmpValue > this.props.max) return
    this.handleSetState({
      value: tmpValue
    })
  }

  decrease = () => {
    let tmpValue = this.state.value - this.props.step
    if (tmpValue < this.props.min) return
    this.handleSetState({
      value: tmpValue
    })
  }

  handleKeyDown = (e) => {
    let tmpValue = null
    if (e.which === 8) {
      let v = (this.state.value+'').split('')
      v.pop()
      tmpValue = (v.length > 0 ? parseFloat(v.join('')) : '')
    } if (e.which >= 48 && e.which <= 57) {
      tmpValue = parseFloat((this.state.value ? `${this.state.value}` : '') + String.fromCharCode(e.which))
    } 
    if (tmpValue !== null) {
      this.handleSetState({value: tmpValue})
    }
  }

  handleSetState = (state) => {
    if (this.props.disabled) return
    this.setState(state)
    this.props.onChange(state.value)
  }

  render() {
    let {value} = this.state
    let {unit, units, onChange, disabled} = this.props
    return (
      <div className={styles.add_sub_wrap}>
        <button 
          className={styles.sub} 
          onClick={this.decrease}
        >
        </button>
        <input 
          className={styles.input} 
          value={
            value + (value > 1 ? ` ${units}` : (value > 0 ? ` ${unit}` : '') )
          }
          onKeyDown={this.handleKeyDown}
          onChange={() => {}}
          disabled={disabled} 
        />
        <button 
          className={styles.add}
          onClick={this.increase}
        >
        </button>
      </div>
    )
  }
}

InputNumber.defaultProps = {
  value: 0,
  step: 1,
  min:  0,
  max:  Infinity,
  unit: '',
  units: '',
  onChange: function(){},
  disabled: false,
}

export default InputNumber