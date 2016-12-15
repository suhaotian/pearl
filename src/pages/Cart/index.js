/* eslint-disable */ 
import React, { Component, PropTypes } from 'react'
import NavBar from '../common/NavBar'
import TouchDelete from 'components/TouchDelete'
import currency from 'utils/currency'
import jump from 'jump.js'
import {m} from 'api/moltin'
import Loading from 'components/Loading'
import styles from './style.css'


window.m = m

class Cart extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    fetching: true,
    requesting: false,
    json: {},
    error: null,
  }

  packaging_options = {}
  componentDidMount() {
    jump(document.body, {duration: 10})

    this.handleFetch()
  }

  handleFetch = () => {
    this.setState({fetching: true})
    m('Cart.Contents').then(res => {
      if (this.willUnmount) return
      let contents = []
      for (let k in res.contents) {
        let item = res.contents[k]
        if (item.packaging_id) {
          let t = item.modifiers[Object.keys(item.modifier)[0]].var_title
          item.title = item.title.replace(' ' + t, '')
          item.var_title = t
          contents.push(item)
          delete res.contents[k]
        } else {
          for (let k in item.modifiers) {
            if(item.modifiers[k]) {
              if (item.modifiers[k].data && item.modifiers[k].data.product) {
                this.packaging_options[item.modifiers[k].data.product] = item
              }
            }
          }
        }
      }
      res.contents = contents
      this.setState({json: res, fetching: false})
    }).catch((e) => {
      if (this.willUnmount) return
      this.setState({fetching: false, error: e.message || "Errors: " + JSON.stringify(e.message)})
    })
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  // componentWillReceiveProps(nextProps) {}
  
  handleDelete = (item) => {
    if(confirm('Are you sure want to delete this?')) {
      this.setState({requesting: true})
      m('Cart.Remove', item.id).then(res => {
        this.setState({requesting: false})
        return m('Cart.Remove', this.packaging_options[item.packaging_id].id)
      }).then(res => {
        this.setState({requesting: false})
        this.handleFetch()
      })
    }
  }

  handlePay = () => {
    confirm('Will go to checkout ?')
  }

  render() {
    const {fetching, error, json} = this.state
    let contentComponent = null
    if (fetching) {
      contentComponent = <Loading color="#000" />
    } else if (error) {
      contentComponent = <div>{error}</div>
    } else if (json.contents.length < 1){
      contentComponent = <div style={{textAlign: 'center', padding: '20px'}}>Shopping cart is empty. Go buy something!</div>
    }

    return (
      <div className={styles.wrap}>
        <NavBar
          router={this.context.router}  
          back={'/list'}
        />
        <div className={styles.title}>Shopping cart</div>
        {
          contentComponent ? contentComponent : (
            <div className={styles.itemWrap}>
              {
                json.contents.map((item, i) => {
                  let packaging = this.packaging_options[item.packaging_id]
                  let p_price = packaging.totals.pre_discount.raw.without_tax
                  let p_title = packaging.modifiers[Object.keys(packaging.modifier)[0]].var_title.split('__-__')[0]
                  return (
                    <div key={item.id} className={styles.item}>
                      <TouchDelete len={-86}>
                        <div className={styles.rowWrap}>
                          <div className={styles.row1}>
                            <span className={styles.name}>{item.title}</span>
                            <span className={styles.total}>{currency(item.totals.pre_discount.raw.without_tax+p_price)}</span>
                          </div>
                          <div className={styles.row2}>
                            {item.var_title} x {item.quantity} {item.unit} <br/>
                            {
                              p_title
                            }
                          </div>              
                        </div>
                        <div 
                          className={styles.delete} 
                          onClick={() => {
                            this.handleDelete(item)
                          }}
                        >delete</div>
                      </TouchDelete>
                    </div>
                  )
                })
              }          
            </div>
          )
        }

        {
          json.contents && json.contents.length > 0 ?
          <div className={styles.ft}>
            <div className={styles.btn} onClick={this.handlePay}>
              Confirm and pay {json.totals.post_discount.formatted.without_tax}
            </div>
          </div> : null
        }
        <div style={{height: 75}}></div>

        {this.state.requesting ? 
          <div
            onTouchMove={e => {e.preventDefault()}}
            style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(255,255,255,.5)', zIndex: 9,}}>
          </div> : null}
      </div>
    )
  }
}


Cart.defaultProps = {}

Cart.propTypes = {}

export default Cart