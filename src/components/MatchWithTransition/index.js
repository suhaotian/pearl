import React, { PropTypes } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import Match from 'react-router/Match'
import StaticComponent from '../StaticComponent'
import styles from './style.css'

const MatchWithTransition = ({ component:Component, ...rest }, context) => {
  const willLeave = () => ({ zIndex: 1, opacity: spring(0) })
  return (
    <Match {...rest} children={({ matched, ...props }) => { 
      if (props.location.query && props.location.query.layer) {
        // console.log(props.location.query.layer)
      }
      return (
      <TransitionMotion
        willLeave={willLeave}
        styles={matched ? [ {
          key: props.location.pathname,
          style: { opacity: 1 },
          data: {...props, router: context.router},
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
                  <Component {...config.data} />
                </StaticComponent>
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )}}/>
  )
}

MatchWithTransition.contextTypes = {
  router: PropTypes.object
}

MatchWithTransition.propTypes = {
  component: PropTypes.any.isRequired
}

MatchWithTransition.defaultProps = {}

export default MatchWithTransition
