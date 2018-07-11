import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
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

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      imageOpacity: props.placeholderSource
        ? new Animated.Value(1.0)
        : new Animated.Value(0.0),
      placeholderOpacity: new Animated.Value(1.0),
      placeholderScale: new Animated.Value(1.0),
    }
  }

  _onLoad = () => {
    const {
      placeholderScale,
      placeholderOpacity,
      imageOpacity,
    } = this.state

    Animated.sequence([
      Animated.parallel([
        Animated.timing(placeholderScale, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(placeholderOpacity, {
          toValue: 0.66,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(placeholderScale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(imageOpacity, {
          toValue: 1.0,
          delay: 200,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      this.setState(() => ({
        loaded: true,
      }))
    })
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
    const {
      imageOpacity,
      loaded,
      placeholderOpacity,
      placeholderScale,
    } = this.state

    return (
      <View
        style={containerStyle || style}
      >
        <Animated.Image
          source={source}
          resizeMode="contain"
          style={[
            style,
            {
              opacity: imageOpacity,
              position: 'absolute',
              resizeMode: 'contain',
            },
          ]}
          onLoad={this._onLoad}
          {...otherProps}
        />

        {
          (placeholderSource && !loaded) &&
          <Animated.Image
            source={placeholderSource}
            style={[
              style,
              {
                opacity: placeholderOpacity,
                position: 'absolute',
              },
            ]}
            {...otherProps}
          />
        }
        {
          (!placeholderSource && !loaded) &&
          <Animated.View
            style={[
              (containerStyle || style),
              {
                backgroundColor: placeholderColor || '#90a4ae',
                opacity: placeholderOpacity,
                position: 'absolute',
                transform: [
                  {
                   scale: placeholderScale,
                  },
                ],
              },
            ]}
          />
        }

      </View>
    )
  }
}
