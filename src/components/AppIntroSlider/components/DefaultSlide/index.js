import React from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    position: 'absolute',
    bottom: 100,
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16,
  },
  image: {
    position: 'absolute',
    top: 0,
  },
  title: {
    position: 'absolute',
    top: 10,
    fontSize: 26,
    color: 'rgba(255, 255, 255, .7)',
    fontWeight: '300',
    paddingHorizontal: 16,
  },
})

export default class DefaultSlide extends React.PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    bottomSpacer: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    image: PropTypes.number.isRequired,
    imageStyle: PropTypes.number,
    text: PropTypes.string,
    textStyle: PropTypes.object,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    topSpacer: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }

  static defaultProps = {
    imageStyle: {},
    text: null,
    textStyle: {},
    title: null,
    titleStyle: {},
  }

  render() {
    const {
      backgroundColor,
      bottomSpacer,
      height,
      image,
      imageStyle,
      text,
      textStyle,
      title,
      titleStyle,
      topSpacer,
      width,
    } = this.props
    const style = {
      backgroundColor,
      height,
      paddingBottom: bottomSpacer,
      paddingTop: topSpacer,
      width,
    }

    return (
      <View style={[
          styles.mainContent,
          style,
        ]}
      >
        <Image
          source={image}
          style={[
            styles.image,
            imageStyle,
          ]}
        />
        <Text style={[
            styles.title,
            titleStyle,
          ]}
        >
          {title}
        </Text>
        <Text style={[
            styles.text,
            textStyle,
          ]}
        >
          {text}
        </Text>
      </View>
    )
  }
}
