import React from 'react'
import PropTypes from 'prop-types'
import { TimelineHeadersConsumer } from './HeadersContext'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { iterateTimes } from '../utility/calendar'
import { getTime } from 'date-fns'

export class CustomHeader extends React.Component {
  static propTypes = {
    //component props
    children: PropTypes.func.isRequired,
    unit: PropTypes.string.isRequired,
    //Timeline context
    timeSteps: PropTypes.object.isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    showPeriod: PropTypes.func.isRequired,
    headerData: PropTypes.object,
    getLeftOffsetFromDate: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    timeZone: PropTypes.string,
  }
  constructor(props) {
    super(props)
    const {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      unit,
      timeZone,
      timeSteps,
      showPeriod,
      getLeftOffsetFromDate
    } = props

    const intervals = this.getHeaderIntervals({
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      unit,
      timeZone,
      timeSteps,
      showPeriod,
      getLeftOffsetFromDate
    })

    this.state = {
      intervals
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
      nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      nextProps.canvasWidth !== this.props.canvasWidth ||
      nextProps.unit !== this.props.unit ||
      nextProps.timeSteps !== this.props.timeSteps ||
      nextProps.showPeriod !== this.props.showPeriod ||
      nextProps.children !== this.props.children ||
      nextProps.headerData !== this.props.headerData
    ) {
      return true
    }
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
      nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      nextProps.canvasWidth !== this.props.canvasWidth ||
      nextProps.unit !== this.props.unit ||
      nextProps.timeSteps !== this.props.timeSteps ||
      nextProps.showPeriod !== this.props.showPeriod
    ) {
      const {
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        unit,
        timeZone,
        timeSteps,
        showPeriod,
        getLeftOffsetFromDate
      } = nextProps

      const intervals = this.getHeaderIntervals({
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        unit,
        timeZone,
        timeSteps,
        showPeriod,
        getLeftOffsetFromDate
      })

      this.setState({ intervals })
    }
  }

  getHeaderIntervals = ({
    canvasTimeStart,
    canvasTimeEnd,
    unit,
    timeZone,
    timeSteps,
    getLeftOffsetFromDate
  }) => {
    const intervals = []
    iterateTimes(
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      timeZone,
      timeSteps,
      (startTime, endTime) => {
        const left = getLeftOffsetFromDate(getTime(startTime))
        const right = getLeftOffsetFromDate(getTime(endTime))
        const width = right - left
        intervals.push({
          startTime,
          endTime,
          labelWidth: width,
          left
        })
      }
    )
    return intervals
  }

  getRootProps = (props = {}) => {
    const { style } = props
    return {
      style: Object.assign({}, style ? style : {}, {
        position: 'relative',
        width: this.props.canvasWidth,
        height: this.props.height,
      })
    }
  }

  getIntervalProps = (props = {}) => {
    const { interval, style } = props
    if (!interval)
      throw new Error('you should provide interval to the prop getter')
    const { startTime, labelWidth, left } = interval
    return {
      style: this.getIntervalStyle({
        style,
        startTime,
        labelWidth,
        canvasTimeStart: this.props.canvasTimeStart,
        unit: this.props.unit,
        left
      }),
      key: `label-${getTime(startTime)}`
    }
  }

  getIntervalStyle = ({ left, labelWidth, style }) => {
    return {
      ...style,
      left,
      width: labelWidth,
      position: 'absolute'
    }
  }

  getStateAndHelpers = () => {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      showPeriod,
      timelineWidth,
      visibleTimeStart,
      visibleTimeEnd,
      headerData,
    } = this.props;
    //TODO: only evaluate on changing params
    return {
      timelineContext: {
        timelineWidth,
        visibleTimeStart,
        visibleTimeEnd,
        canvasTimeStart,
        canvasTimeEnd
      },
      headerContext: {
        unit,
        intervals: this.state.intervals
      },
      getRootProps: this.getRootProps,
      getIntervalProps: this.getIntervalProps,
      showPeriod,
      data: headerData,
    }
  }

  render() {
    const props = this.getStateAndHelpers()
    const Renderer = this.props.children
    return <Renderer {...props}/>
  }
}

const CustomHeaderWrapper = ({ children, unit, headerData, height }) => (
  <TimelineStateConsumer>
    {({ getTimelineState, showPeriod, getLeftOffsetFromDate }) => {
      const timelineState = getTimelineState()
      return (
        <TimelineHeadersConsumer>
          {({ timeSteps }) => (
            <CustomHeader
              children={children}
              timeSteps={timeSteps}
              showPeriod={showPeriod}
              unit={unit ? unit : timelineState.timelineUnit}
              {...timelineState}
              headerData={headerData}
              getLeftOffsetFromDate={getLeftOffsetFromDate}
              height={height}
            />
          )}
        </TimelineHeadersConsumer>
      )
    }}
  </TimelineStateConsumer>
)

CustomHeaderWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  unit: PropTypes.string,
  headerData: PropTypes.object,
  height: PropTypes.number,
}

CustomHeaderWrapper.defaultProps = {
  height: 30,
}

export default CustomHeaderWrapper
