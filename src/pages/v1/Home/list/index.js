import React, { Component } from 'react'
import Item from './item'
import styles from './list.css'


export default class List extends Component {
  render() {
    return (
      <div className="container" style={{marginTop: -20}}>
        <div className={styles.block}>
          <h2 className={styles.title}>Oyster</h2>
          <div className={styles.wrap}>
            {
              this.data.map((item, i) => (
                <Item key={i} {...item} />
              ))
            }
          </div>
        </div>

        <div className={styles.block}>
          <h2 className={styles.title}>All seafood</h2>
          <div className={styles.wrap}>
            {
              this.data2.map((item, i) => (
                <Item key={i} {...item} />
              ))
            }
          </div>
        </div>
      </div>
    )
  }

  // Will replace by mock data, like:
  // fetch(xx).then((data) => {setState({data}))
  data = [
    {
      id: 1,
      name: 'Kusshi Oyster',
      img: require('./img4@2x.jpg'),
      desc: 'Kusshis are all the rage out West, due to their small size and ultra-clean flavor. Kusshi, Japanese for “precious,” is almost as deep as it is long—just over two inches. ',
      price: '$22.00 - $28.00',
      unit: 'p/dz',
    },
    {
      id: 2,
      name: 'Kusshi Oyster',
      img: require('./img4@2x.jpg'),
      desc: 'Kusshis are all the rage out West, due to their small size and ultra-clean flavor. Kusshi, Japanese for “precious,” is almost as deep as it is long—just over two inches. ',
      price: '$22.00 - $28.00',
      unit: 'p/dz',
    },
    {
      id: 3,
      name: 'Kusshi Oyster',
      img: require('./img4@2x.jpg'),
      desc: 'Kusshis are all the rage out West, due to their small size and ultra-clean flavor. Kusshi, Japanese for “precious,” is almost as deep as it is long—just over two inches. ',
      price: '$22.00 - $28.00',
      unit: 'p/dz',
    },
  ]
  data2 = [
    {
      id: 11,
      name: 'Pacific Urchin',
      img: require('./img1@2x.jpg'),
      desc: 'Kusshis are all the rage out West, due to their small size and ultra-clean flavor. Kusshi, Japanese for “precious,” is almost as deep as it is long—just over two inches. ',
      price: '$22.00 - $28.00',
      unit: 'p/dz',
    },
    {
      id: 22,
      name: 'Geoduck',
      img: require('./img2@2x.jpg'),
      desc: 'Kusshis are all the rage out West, due to their small size and ultra-clean flavor. Kusshi, Japanese for “precious,” is almost as deep as it is long—just over two inches. ',
      price: '$22.00 - $28.00',
      unit: 'p/dz',
    },
    {
      id: 33,
      name: 'Dungeness Crab',
      img: require('./img3@2x.jpg'),
      desc: 'Kusshis are all the rage out West, due to their small size and ultra-clean flavor. Kusshi, Japanese for “precious,” is almost as deep as it is long—just over two inches. ',
      price: '$22.00 - $28.00',
      unit: 'p/dz',
    },
  ]

}