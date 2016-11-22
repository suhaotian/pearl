import React from 'react'
import styles from './style.css'

const Loading = ({size, color, style, ...other}) => (
  <div className={styles.wrap}>
    {
      [1,2,3].map((item) => (
        <div
          key={item} 
          className={styles[`dot_${item}`]} 
          style={{
            width: size, height: size, 
            backgroundColor: color, ...style
          }}
        />
      ))
    }
  </div>                           
)

Loading.defaultProps = {
  size: 6,
  color: '#117bf9',
}

export default Loading