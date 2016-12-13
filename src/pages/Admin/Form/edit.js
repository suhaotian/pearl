import React, { Component } from 'react'
import TouchDelete from 'components/TouchDelete'
import NavBar from '../../common/NavBar'
import SelectUtil from 'components/SelectUtil'
import Increase from 'components/Stepper/Increase'
import Loading from 'components/Loading'
import validate from './edit_validate'
import units from './units'
import {ajax} from 'api'
import uuid from './uuid'
import {GlobalLoading} from 'components/Loading'
import styles from '../style.css'


class FormPage extends Component {

  init = () => {
    const data = JSON.parse(localStorage.getItem('CURRENT_EDIT_PRODUCT_INFO'))
    this.packagingID = data.packaging.id
    const {product, packaging} = data
    let product_variations = []
    let packaging_variations = []
    for (let k in product.modifiers) {
      let modifier = product.modifiers[k]
      this.product_mid = modifier.id
      for (let k2 in modifier.variations) {
        let variation = modifier.variations[k2]
        product_variations.unshift({
          id: variation.id, type: variation.title, 
          stock: variation.stock_level || '', 
          price: variation.mod_price.replace('=', '')
        })
      }
    }
    for (let k in packaging.modifiers) {
      let modifier = packaging.modifiers[k]
      this.packaging_mid = modifier.id
      for (let k2 in modifier.variations) {
        let variation = modifier.variations[k2]
        let infos = variation.title.split('__-__')
        packaging_variations.unshift({
          id: variation.id, 
          type: infos[0], capacity: infos[1], 
          price: variation.mod_price.replace('=', '')
        })
      }
    }

    const original_state = {
      name: product.title,
      description: product.description,
      unit: product.unit,
      variations: product_variations,
      packagings: packaging_variations,
      requesting: false,
      loading: true,
    }

    return original_state
  }

  state = this.init()

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {
    ajax().then(instance => {
      instance(`products/${this.props.params.id}/variations`)
        .then(res => {
          if (this.willUnmount) return
          const variations = this.state.variations.map((item, i) => {
            item.stock = res.data.result[i].stock_level
            return item
          })
          this.setState({loading: false, variations}, () => {
            localStorage.setItem('OSTATE', JSON.stringify(this.state))
          })
        })
    })
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  // componentWillReceiveProps(nextProps) {}

  render() {
    if (this.state.loading) {
      return <GlobalLoading />
    }
    return (
      <div>
        <NavBar
          router={this.props.router}  
        />
        <div className={styles.title}>Edit {this.state.name}</div>

        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>desription</span> 
          </div>
          <div className={styles.formInner}>
            <textarea 
              className={styles.textarea}
              value={this.state.description}
              onChange={(e) => {
                this.setState({description: e.target.value})
              }}
            />
          </div>
        </div>

        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>Unit of measure</span> 
          </div>
          <div className={styles.unitWrap}>
            <SelectUtil
              className={styles.unit} 
              activeClassName={styles.activeUnit} 
              data={units}
              keyField="value"
              current={this.state.unit}
              onChange={(v) => {
                this.setState({unit: v})
              }}
            >
              {
                (item) => (item.value)
              }
            </SelectUtil>
          </div>
        </div>

        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>Variations, stock and price</span> 
            <Increase 
              onClick={() => {
                const new_variation = {id: uuid('v'), type: '', stock: '', price: '', is_new: true}
                this.setState({
                  variations: this.state.variations.concat(new_variation)
                }, () => {
                  window.scrollTo(0, (window.offsetTop || window.scrollY) + 40)
                })
              }} 
              style={{width: 15, height: 15}} 
            />
          </div>
          <div className={styles.formInner}>
              <div className={styles.th}>
                  <div style={{width: '55%',paddingLeft: 15}}>
                    type
                  </div>
                  <div style={{width: '22.5%', textAlign: 'right'}}>
                    stock
                  </div>
                  <div style={{width: '22.5%', textAlign: 'right'}}>
                    price
                  </div>
              </div>
              
              {
                this.state.variations.map((item, i) => (
                  <div key={item.id} className={styles.tb} style={{borderTop: 0}}>
                    <TouchDelete len={-68}>
                      <div className={styles.inner}>
                        <div style={{width: '55%'}}>
                          <input
                            type="text" 
                            onChange={(e) => {
                              let value = e.target.value
                              this.setState((prevState) => {
                                let state = prevState
                                state.variations[i].type = value
                                return state
                              })
                            }}
                            value={this.state.variations[i].type}
                            style={{paddingLeft: 15}}
                          />
                        </div>
                        <div style={{width: '22.5%', textAlign: 'right'}}>
                          <input 
                            type="number" 
                            pattern="[0-9]*" 
                            onChange={(e) => {
                              let value = e.target.value
                              this.setState((prevState) => {
                                let state = prevState
                                state.variations[i].stock = value
                                return state
                              })
                            }}
                            value={this.state.variations[i].stock}
                            style={{paddingRight: 9}}
                          />
                        </div>
                        <div style={{width: '22.5%', textAlign: 'right'}}>
                          <input 
                            type="text" 
                            style={{paddingRight: 9}}
                            onChange={(e) => {
                              let value = e.target.value
                              this.setState((prevState) => {
                                let state = prevState
                                state.variations[i].price = value
                                return state
                              })
                            }}
                            value={this.state.variations[i].price}
                          />
                        </div>
                        <div
                          className={styles.delete}
                          onClick={() => {
                            if (item.is_new) {
                              this.setState({
                                variations: this.state.variations.filter(item_2 => item.id !== item_2.id)
                              })
                              return
                            }
                            if (confirm('Are you sure want to delete this variation ?')) {
                              this.setState({
                                variations: this.state.variations.filter(item_2 => item.id !== item_2.id)
                              })

                              ajax().then(instance => {
                                return instance.delete(`products/${this.props.params.id}/modifiers/${this.product_mid}/variations/${item.id}`)
                              }).then(res => {
                                if (!res.data.status) {
                                  console.log('delete failed')
                                  if (this.willUnmount) return
                                  this.setState({variations: [item].concat(this.state.variations)})
                                }
                              })
                            }
                          }}
                        >delete</div>
                      </div>
                    </TouchDelete>
                  </div>
                ))
              }
            
          </div>
        </div>

        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>Packaging options</span>
            <Increase 
              onClick={() => {
                const new_packaging = {id: uuid('p'), type: '', capacity: '', price: '', is_new: true,}
                this.setState({
                  packagings: this.state.packagings.concat(new_packaging)
                }, () => {
                  window.scrollTo(0, (window.offsetTop || window.scrollY) + 40)
                })
              }} 
              style={{width: 15, height: 15}} 
            />
          </div>
          <div className={styles.formInner}>
            <div className={styles.th}>
              <div style={{width: '55%',paddingLeft: 15}}>
                type
              </div>
              <div style={{width: '22.5%', textAlign: 'right'}}>
                capacity
              </div>
              <div style={{width: '22.5%', textAlign: 'right'}}>
                price
              </div>
            </div>
              {
                this.state.packagings.map((item, i) => (
                  <div key={item.id} className={styles.tb} style={{borderTop: 0}}>
                    <TouchDelete len={-68}>
                      <div className={styles.inner}>
                        <div style={{width: '55%'}}>
                          <input
                            type="text" 
                            onChange={(e) => {
                              let value = e.target.value
                              this.setState((prevState) => {
                                let state = prevState
                                state.packagings[i].type = value
                                return state
                              })
                            }}
                            value={this.state.packagings[i].type}
                            style={{paddingLeft: 15}}
                          />
                        </div>
                        <div style={{width: '22.5%', textAlign: 'right'}}>
                          <input 
                            type="number" 
                            pattern="[0-9]*" 
                            onChange={(e) => {
                              let value = e.target.value
                              this.setState((prevState) => {
                                let state = prevState
                                state.packagings[i].capacity = value
                                return state
                              })
                            }}
                            value={this.state.packagings[i].capacity}
                            style={{paddingRight: 9}}
                          />
                        </div>
                        <div style={{width: '22.5%', textAlign: 'right'}}>
                          <input 
                            type="text" 
                            style={{paddingRight: 9}}
                            onChange={(e) => {
                              let value = e.target.value
                              this.setState((prevState) => {
                                let state = prevState
                                state.packagings[i].price = value
                                return state
                              })
                            }}
                            value={this.state.packagings[i].price}
                          />
                        </div>
                        <div
                          className={styles.delete}
                          onClick={() => {
                            if (item.is_new) {
                              this.setState({
                                packagings: this.state.packagings.filter(item_2 => item.id !== item_2.id)
                              })
                              return
                            }
                            if (confirm('Are you sure want to delete this packaging option ?')) {
                              this.setState({
                                packagings: this.state.packagings.filter(item_2 => item.id !== item_2.id)
                              })

                              ajax().then(instance => {
                                return instance.delete(`products/${this.packagingID}/modifiers/${this.packaging_mid}/variations/${item.id}`)
                              }).then(res => {
                                if (!res.data.status) {
                                  console.log('delete failed')
                                  if (this.willUnmount) return
                                  this.setState({packagings: [item].concat(this.state.packagings)})
                                }
                              })
                            }
                          }}
                        >delete</div>
                      </div>
                    </TouchDelete>
                  </div>
                ))
              }
          </div>
        </div>

        <div className={styles.ft}>
          <div className={styles.deleteText}>
            <span onClick={() => {
              if (confirm('Are you sure want to delete \nthis product?')) {
                this.setState({
                  requesting: true
                })
                ajax().then(instance => {
                  instance.delete(`products/${this.props.params.id}`).then(res => {
                    if (res.data.status) {
                      this.props.router.replaceWith('/admin')
                    }
                  })
                })
              }
            }}>delete</span>
          </div>
          <div className={styles.halfBtn}>
            <div className={styles.btn} onClick={() => {
              validate(this.state, this)
            }}>
              {
                this.state.requesting ?
                <Loading color="#fff" /> : 'save'
              }
            </div>
          </div>
        </div>
        <div style={{height: 75}}></div>
        {
          this.state.requesting ?
          <div
            onTouchMove={e => {e.preventDefault()}}
            style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(255,255,255,.5)', zIndex: 0,}}>
          </div> : null        
        }
      </div>

    )
  }
}

export default FormPage