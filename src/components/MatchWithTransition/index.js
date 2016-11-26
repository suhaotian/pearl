import React, { PropTypes } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import Match from 'react-router/Match'
import styles from './style.css'

const MatchWithTransition = ({ component:Component, ...rest }) => {
  const willLeave = () => ({ zIndex: 1, opacity: spring(0) })

  return (
    <Match {...rest} children={({ matched, ...props }) => (
      <TransitionMotion
        willLeave={willLeave}
        styles={matched ? [ {
          key: props.location.pathname,
          style: { opacity: 1 },
          data: props
        } ] : []}
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(config => (
              <div
                key={config.key}
                className={styles.page}
                style={config.style}
              >
                <Component {...config.data}/>
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )}/>
  )
}
MatchWithTransition.propTypes = {}

MatchWithTransition.defaultProps = {}

export default MatchWithTransition
