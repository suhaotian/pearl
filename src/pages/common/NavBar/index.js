import React, { Component } from 'react'
import styles from './style.css'

class NavBar extends Component {
  
  state = {
    animate: ''
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {
    this.setState({
      animate: ` ${styles.animate}`
    })
  }

  goTo = (path) => {
    this.props.router.transitionTo(path)
  }

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}

  render() {
    let {back,onClose,title,cart,arrow,noPadding} = this.props
    let Close = () => (<span className={styles.iconClose} onClick={() => {
      if (!onClose) {
        this.goTo(back)
      } else {
        onClose()
      }
    }}></span>)
    let Arrow = () => (<span className={styles.iconBack} onClick={this.goTo.bind(null, back)}></span>)
    let Cart = () => (<span className={styles.iconCart} onClick={this.goTo.bind(null, '/cart')}></span>)
    return (
      <div className={styles.nav+this.state.animate} style={noPadding ? {} : {paddingLeft: 15, paddingRight: 15}}>
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