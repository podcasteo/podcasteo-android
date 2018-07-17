import React from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  View,
} from 'react-native'

export default class ImageLoader extends React.Component {
  static propTypes = {
    placeholderSource: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]),
    placeholderColor: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    containerStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
    source: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
  }

  static defaultProps = {
    placeholderSource: null,
    placeholderColor: '#FAFAFA',
    containerStyle: null,
  }

  render() {
    const {
      containerStyle,
      placeholderColor,
      placeholderSource,
      style,
      source,
      ...otherProps
    } = this.props

    return (
      <View
        style={containerStyle || style}
      >
        {
          (placeholderSource) ? (
            <Image
              source={placeholderSource}
              style={[
                style,
                {
                  opacity: 1,
                  position: 'absolute',
                },
              ]}
              resizeMode="cover"
              {...otherProps}
            />
          ) : (
            <View
              style={[
                (containerStyle || style),
                {
                  backgroundColor: placeholderColor || '#90a4ae',
                  opacity: 1,
                  position: 'absolute',
                  transform: [
                    {
                     scale: 1,
                    },
                  ],
                },
              ]}
            />
          )
        }
        <Image
          source={source}
          style={[
            style,
            {
              opacity: 1,
              position: 'absolute',
            },
          ]}
          resizeMode="cover"
          {...otherProps}
        />
      </View>
    )
  }
}
