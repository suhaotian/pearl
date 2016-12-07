import React, { Component, PropTypes } from 'react'
import styles from '../style.css'
import TouchDelete from 'components/TouchDelete'
import NavBar from '../../common/NavBar'
import SelectUtil from 'components/SelectUtil'
import Increase from 'components/Stepper/Increase'

const units = [
  {
    id: 0,
    value: 'kilogram',
  },
  {
    id: 1,
    value: 'pound',
  },
  {
    id: 2,
    value: 'dozen',
  },
  {
    id: 3,
    value: 'piece',
  }
]

class FormPage extends Component {
  // static defaultProps = {}

  // static propTypes = {}

  // state = {}

  // shouldComponentUpdate(nextProps, nextState) {}

  // componentDidMount() {}

  // componentWillUnmount() {}

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
            <input className={styles.input}/>
          </div>
        </div>

        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>desription</span> 
          </div>
          <div className={styles.formInner}>
            <textarea className={styles.textarea}/>
          </div>
        </div>

        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>Unit of measure</span> 
          </div>
          <div className={styles.unitWrap}>
            <SelectUtil className={styles.unit} activeClassName={styles.activeUnit} data={units}>
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
            onClick={() => {}} 
            style={{width: 15, height: 15}} />
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
              <div className={styles.tb} style={{borderTop: 0}}>
                <TouchDelete len={-68}>
                  <div className={styles.inner}>
                    <div style={{width: '55%'}}>
                      <input type="text" style={{paddingLeft: 15}}/>
                    </div>
                    <div style={{width: '22.5%', textAlign: 'right'}}>
                      <input type="number" pattern="[0-9]*" style={{paddingRight: 9}}/>
                    </div>
                    <div style={{width: '22.5%', textAlign: 'right'}}>
                      <input type="text" style={{paddingRight: 9}}/>
                    </div>

                    <div className={styles.delete}>delete</div>
                  </div>
                </TouchDelete>
              </div>
          </div>
        </div>

        <div className={styles.formConainer}>
          <div className={styles.formTitle}>
            <span className={styles.name}>Packaging options</span>
            <Increase 
            onClick={() => {}} 
            style={{width: 15, height: 15}} />
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
            <div className={styles.tb} style={{borderTop: 0}}>
              <TouchDelete len={-68}>
                <div className={styles.inner}>
                  <div style={{width: '55%'}}>
                    <input type="text" style={{paddingLeft: 15}}/>
                  </div>
                  <div style={{width: '22.5%', textAlign: 'right'}}>
                    <input type="number" pattern="[0-9]*" style={{paddingRight: 9}}/>
                  </div>
                  <div style={{width: '22.5%', textAlign: 'right'}}>
                    <input type="text" style={{paddingRight: 9}}/>
                  </div>
                  <div className={styles.delete}>delete</div>
                </div>
              </TouchDelete>
            </div>
          </div>
        </div>

        <div className={styles.ft}>
          <div className={styles.deleteText}>
            <span onClick={() => {
              this.props.router.transitionTo('/admin')
            }}>delete</span>
          </div>
          <div className={styles.halfBtn}>
            <div className={styles.btn} onClick={() => {
              this.props.router.transitionTo('/admin')
            }}>save</div>
          </div>
        </div>
        <div style={{height: 75}}></div>

      </div>

    )
  }
}

export default FormPage