import React from 'react'
import PropTypes from 'prop-types'
import {
  ImageBackground,
} from 'react-native'

import unknownImage from 'assets/defaults/unknown.png'

export default class ImageBackgroundLoader extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    placeholderSource: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]),
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    source: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
  }

  static defaultProps = {
    placeholderSource: unknownImage,
  }

  constructor(props) {
    super(props)

    this.state = {
      error: false,
      showDefault: true,
    }
  }

  render() {
    const {
      placeholderSource,
      source,
      style,
      children,
      ...otherProps
    } = this.props
    const {
      error,
      showDefault,
    } = this.state
    let image = {}

    image = (showDefault || !source) ? placeholderSource : source

    return (
      <ImageBackground
        style={style}
        source={image}
        onLoadEnd={() => {
          if (!error) {
            this.setState({
              showDefault: false,
            })
          }
        }}
        onError={() => {
          this.setState({
            showDefault: true,
            error: true,
          })
        }}
        {...otherProps}
      >
        {children}
      </ImageBackground>
    )
  }
}
