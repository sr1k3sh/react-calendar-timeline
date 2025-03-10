import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../utility/generic'

const defaultContextState = {
  registerScroll: () => {
    // eslint-disable-next-line
    console.warn('default registerScroll header used')
    return noop
  },
  rightSidebarWidth: 0,
  leftSidebarWidth: 150,
  timeSteps: {}
}

const { Consumer, Provider } = React.createContext(defaultContextState)


export class TimelineHeadersProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    rightSidebarWidth: PropTypes.number,
    leftSidebarWidth: PropTypes.number.isRequired,
    //TODO: maybe this should be skipped?
    timeSteps: PropTypes.object.isRequired,
    registerScroll: PropTypes.func.isRequired,
    timeZone: PropTypes.string.isRequired
  }


  render() {
    const contextValue = {
      rightSidebarWidth: this.props.rightSidebarWidth,
      leftSidebarWidth: this.props.leftSidebarWidth,
      timeSteps: this.props.timeSteps,
      registerScroll: this.props.registerScroll,
      timeZone: this.props.timeZone
    }
    return <Provider value={contextValue}>{this.props.children}</Provider>
  }
}

export const TimelineHeadersConsumer = Consumer
