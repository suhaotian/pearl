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
    let {back,title,cart} = this.props
    let Close = () => (<span className={styles.iconClose} onClick={this.goTo.bind(null, back)}></span>)
    // let Back = () => (<span className={styles.iconBack} onClick={() => {this.goTo('/')}}></span>)
    let Cart = () => (<span className={styles.iconCart} onClick={this.goTo.bind(null, '/cart')}></span>)

    return (
      <div className={styles.nav+this.state.animate}>
        { back ? <Close /> : null }
        <span className={styles.title}>{title}</span>
        { cart ? <Cart /> : null }
      </div>    
    )
  }
}

NavBar.defaultProps = {}

NavBar.propTypes = {}

export default NavBar