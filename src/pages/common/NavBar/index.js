import React, { Component } from 'react'
import styles from './style.css'

class NavBar extends Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  goTo = (path) => {
    this.props.router.transitionTo(path)
  }

  replaceWith = (path) => {
    this.props.router.replaceWith(path)
  }

  componentDidMount() {
    if (this.props.title) document.title = this.props.title
  }

  // componentWillReceiveProps(nextProps) {}

  render() {
    let {back,onClose, goTo, replaceWith, title,cart, arrow,noPadding} = this.props
    let Close = () => (<span className={styles.iconClose} onClick={() => {
      if (!onClose) {
        if (replaceWith && 1) {
          this.replaceWith(back)
          return
        }
        if (goTo && 1) {
          this.goTo(back)
          return
        }
        history.back()
      } else {
        onClose()
      }
    }}></span>)
    let Arrow = () => (<span className={styles.iconBack} onClick={this.goTo.bind(null, back)}></span>)
    let Cart = () => (<span className={styles.iconCart} onClick={this.goTo.bind(null, '/cart')}></span>)
    return (
      <div className={styles.nav} style={noPadding ? {} : {paddingLeft: 15, paddingRight: 15}}>
        { back ? (arrow ? <Arrow /> : <Close />) : null }
        { title ? <span className={styles.title}>{title}</span> : null }
        { cart ? <Cart /> : null }
      </div>    
    )
  }
}

NavBar.defaultProps = {}

NavBar.propTypes = {}

export default NavBar