import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
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

  render() {
    const {
      placeholderSource,
      source,
      style,
      children,
      ...otherProps
    } = this.props

    return (
      <View
        style={style}
      >
        <ImageBackground
          style={[
            style,
            {
              width: '100%',
            },
          ]}
          source={placeholderSource}
          {...otherProps}
        >
          <ImageBackground
            style={[
              style,
              {
                width: '100%',
              },
            ]}
            source={source}
            {...otherProps}
          >
            {children}
          </ImageBackground>
        </ImageBackground>
      </View>
    )
  }
}
