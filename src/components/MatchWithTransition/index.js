import React, { PropTypes } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import Match from 'react-router/Match'
import StaticComponent from '../StaticComponent'
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
                style={config.style}
                className={styles.page}
                id={'page_container'}
              > 
                <StaticComponent>
                  <Component {...config.data}/>
                </StaticComponent>
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )}/>
  )
}
MatchWithTransition.propTypes = {
  component: PropTypes.any.isRequired
}

MatchWithTransition.defaultProps = {}

export default MatchWithTransition
