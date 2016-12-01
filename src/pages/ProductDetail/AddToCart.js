import React, { Component } from 'react'
import NavBar from '../common/NavBar'
import Stepper from 'components/Stepper'
import SelectUtil from 'components/SelectUtil'
import currency from 'utils/currency'
import styles from './addToCart.css'


const packages = [
  {
    name: 'Wax cardboard paper',
    unit: '20dz p/box',
    price: 0,
  },
  {
    name: 'Enviro friendly paper',
    unit: '20dz p/box',
    price: 0,
  },
  {
    name: 'Wooden box',
    unit: '8dz p/box',
    price: 2,
  }
]


class AddToCartPage extends Component {
  
  state = {
    amount: 20,
    current: 2,
  }

  componentDidMount() {
    document.body.setAttribute('style', "overflow: hidden")
  }

  componentWillUnmount() {
    document.body.removeAttribute('style') 
  }
  // shouldComponentUpdate(nextProps, nextState) {}

  // componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className={styles.page}>
        <NavBar
          router={this.context.router}  
          back={'/list'}
          onClose={this.props.onClose}
        />

        <div className={styles.title}>add to cart</div>

        <p className={styles.info}>
          {this.props.name} <br/>
          {this.props.data.value}
        </p>

        <div className={styles.headTip}>quantity</div>
        <Stepper 
          value={this.state.amount}
          onChange={v =>{this.setState({amount: v})}} 
          unit={'dozen'} units={'dozen'}
        />

        <div className={styles.headTip}>packaging</div>
        <div className={styles.package}>
          <SelectUtil 
            data={packages} 
            current={this.state.current} 
            activeClassName={styles.active} 
            onChange={(current) => {this.setState({current: current})}}
          >
            {
              (item) => (
                <div className={styles.packageItem}>
                  <span>{item.name} ({item.unit})</span>
                  { item.price ? <span>+ {currency(item.price)} p/box</span> : null }
                </div>
              )
            }
          </SelectUtil>
        </div>

        <div className={styles.ft}>
          <div className={styles.totalWrap}>
            <div className={styles.headTitle}>total</div>
            <div className={styles.price}>
              {currency(this.state.amount*this.props.data.price + packages[this.state.current].price)}
            </div>
          </div>
          <div className={styles.halfBtn}>
            <div className={styles.btn} onClick={() => {
              this.props.router.transitionTo('/cart')
            }}>Add to cart</div>
          </div>
        </div>
        <div style={{height: 80}}></div>         
      </div>
    )
  }
}

AddToCartPage.defaultProps = {}

AddToCartPage.propTypes = {}

export default AddToCartPage