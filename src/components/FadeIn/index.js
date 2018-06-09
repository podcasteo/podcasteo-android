import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
} from 'react-native'

export default class FadeIn extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.shape({}),
    timer: PropTypes.number,
  }

  static defaultProps = {
    timer: 2000,
    style: {},
  }

  state = {
    fadeAnim: new Animated.Value(0),
  }

  componentDidMount() {
    const {
      timer,
    } = this.props

    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: timer,
      },
    ).start()
  }

  render() {
    const {
      fadeAnim,
    } = this.state

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim,
        }}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}
