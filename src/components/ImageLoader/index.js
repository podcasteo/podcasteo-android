import React from 'react'
import PropTypes from 'prop-types'
import {
  Image,
} from 'react-native'

import unknownImage from 'assets/defaults/unknown.png'

export default class ImageLoader extends React.Component {
  static propTypes = {
    defaultSource: PropTypes.number,
    source: PropTypes.string,
    style: PropTypes.number,
  }

  static defaultProps = {
    defaultSource: unknownImage,
    source: null,
    style: null,
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
      defaultSource,
      source,
      style,
      ...otherProps
    } = this.props
    const {
      showDefault,
      error,
    } = this.state
    let image = {}

    image = (showDefault || !source) ? defaultSource : {
      uri: source,
    }

    return (
      <Image
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
      />
    )
  }
}
