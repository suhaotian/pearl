/* eslint-disable */ 
import React, { Component } from 'react'
import NavBar from '../common/NavBar'
import Stepper from 'components/Stepper'
import SelectUtil from 'components/SelectUtil'
import currency from 'utils/currency'
import {m} from 'api/moltin'
import Loading, {GlobalLoading} from 'components/Loading'
import styles from './addToCart.css'


class AddToCartPage extends Component {
  
  state = {
    amount: 1,
    current: 0,
    requesting: false,
    fetching: true,
    error: null,
    packaging: [],
  }

  componentDidMount() {
    document.body.setAttribute('style', "overflow: hidden")
    m('Product.Get', this.props.data.packaging_id)
      .then(res => {
        if (this.willUnmount) return
        let packaging_variations = []
        for (let k in res.modifiers) {
          let modifier = res.modifiers[k]
          this.packaging_mid = modifier.id
          for (let k2 in modifier.variations) {
            let variation = modifier.variations[k2]
            let infos = variation.title.split('__-__')
            packaging_variations.push({
              id: variation.id, 
              type: infos[0], capacity: infos[1], 
              price: parseFloat(variation.mod_price.replace('=', ''))
            })
          }

          this.setState({fetching: false, packaging: packaging_variations})
        }

      })
      .catch(e => {
        if (this.willUnmount) return
        this.setState({error: e.message})
      })

  }

  componentWillUnmount() {
    document.body.removeAttribute('style') 
    this.willUnmount = true
  }


  render() {
    if (this.state.fetching) return <GlobalLoading />
    return (
      <div className={styles.page}>
        <NavBar
          router={this.context.router}  
          back={'/list'}
          onClose={this.props.onClose}
        />

        <div className={styles.title}>add to cart</div>

        <p className={styles.info}>
          {this.props.data.title} <br/>
          {this.props.variation.type}
        </p>

        <div className={styles.headTip}>quantity</div>
        <Stepper 
          value={this.state.amount}
          onChange={v =>{this.setState({amount: v})}} 
          unit={this.props.data.unit} units={this.props.data.unit}
        />

        <div className={styles.headTip}>packaging</div>
        <div className={styles.package}>
          <SelectUtil 
            data={this.state.packaging} 
            current={this.state.current} 
            activeClassName={styles.active} 
            onChange={(current) => {this.setState({current: current})}}
          >
            {
              (item) => (
                <div className={styles.packageItem}>
                  <span>{item.type} ({item.capacity} {this.props.data.unit} p/box)</span>
                  <span className={styles.packaging_price}>+ {currency(item.price)} p/box</span>
                </div>
              )
            }
          </SelectUtil>
        </div>

        <div className={styles.ft}>
          <div className={styles.totalWrap}>
            <div className={styles.headTitle}>total</div>
            <div className={styles.price}>
              {currency(this.state.amount*this.props.variation.price + this.state.packaging[this.state.current].price)}
            </div>
          </div>
          <div className={styles.halfBtn}>
            <div className={styles.btn} onClick={() => {
              if (this.state.amount == 0) {
                alert('At least have one item!')
                return
              }
              if (this.state.requesting) return
              const variation = {}
              const packaging_variation = {}
              variation[this.props.modifier_id] = this.props.variation.id
              packaging_variation[this.packaging_mid] = this.state.packaging[this.state.current].id
              this.setState({requesting: true})
              m('Cart.Insert', this.props.data.id, this.state.amount, variation).then(res => {
                return m('Cart.Insert', this.props.data.packaging_id, 1, packaging_variation)
              }).then((res) => {
                alert('Add success!')
                this.props.router.transitionTo('/cart')
              }).catch(e => {
                this.setState({requesting: false})
                alert(JSON.stringify(e))
              })
            }}>
              {
                this.state.requesting ?
                <Loading color="#fff" /> :
                <span>Add to cart</span>
              }
            </div>
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