import React, { Component } from 'react'
import TouchDelete from 'components/TouchDelete'
import NavBar from '../../common/NavBar'
import SelectUtil from 'components/SelectUtil'
import Increase from 'components/Stepper/Increase'
import Loading from 'components/Loading'
import validate from './validate'
import units from './units'
import uuid from './uuid'
import styles from '../style.css'

class FormPage extends Component {

  state = {
    name: '',
    description: '',
    unit: '',
    requesting: false,
    variations: [
      {
        id: uuid('v'),
        type: '',
        stock: '',
        price: '',
      },
    ],
    packagings: [
      {
        id: uuid('p'),
        type: '',
        capacity: '',
        price: '',
      },
    ],
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {
    // console.log(this.props.params)
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  // componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
        <NavBar
          router={this.props.router}  
        />
        <div className={styles.title}>Add new product</div>


        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>product name</span> 
          </div>
          <div className={styles.formInner}>
            <input 
              className={styles.input}
              value={this.state.name}
              onChange={(e) => {
                this.setState({name: e.target.value})
              }}
            />
          </div>
        </div>

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
                this.setState({
                  variations: this.state.variations.concat({id: uuid('v'), type: '', stock: '', price: '',})
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
                            if (this.state.variations.length < 2) {
                              // alert('At least have one!')
                              this.setState({variations: [{id: uuid('v'), type: '', stock: '', price: '',}]})
                              return
                            }

                            this.setState({
                              variations: this.state.variations.filter(item_2 => item.id !== item_2.id)
                            })
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
                this.setState({
                  packagings: this.state.packagings.concat({id: uuid('p'), type: '', capacity: '', price: '',})
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
                            if (this.state.packagings.length < 2) {
                              // alert('At least have one!')
                              this.setState({packagings: [{id: uuid('p'), type: '', capacity: '', price: '',}]})
                              return
                            }
                            this.setState({
                              packagings: this.state.packagings.filter(item_2 => item.id !== item_2.id)
                            })
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
              if (confirm('Are you sure want to cancel create \nthis product?')) {
                this.props.router.replaceWith('/admin') 
              }
            }}>cancel</span>
          </div>
          <div className={styles.halfBtn}>
            <div className={styles.btn} onClick={() => {
              validate(this.state, this.props.params.id, this)
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
            style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(255,255,255,.5)', zIndex: 9,}}>
          </div> : null        
        }
      </div>

    )
  }
}

export default FormPage