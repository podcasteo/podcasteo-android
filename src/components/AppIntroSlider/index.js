import React from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import DefaultSlide from './components/DefaultSlide'

const {
  width: appWidth,
  height: appHeight,
} = Dimensions.get('window')
const isIphoneX = (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (appHeight === 812 || appWidth === 812)
)
const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16 + (isIphoneX ? 34 : 0),
    left: 0,
    right: 0,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 0,
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 0,
  },
  bottomButtonContainer: {
    height: 44,
    marginHorizontal: 16,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    padding: 16,
  },
})

export default class AppIntroSlider extends React.Component {
  static propTypes = {
    activeDotColor: PropTypes.string,
    bottomButton: PropTypes.bool,
    doneLabel: PropTypes.string,
    dotColor: PropTypes.string,
    hidePagination: PropTypes.bool,
    nextLabel: PropTypes.string,
    onDone: PropTypes.func,
    onSkip: PropTypes.func,
    onSlideChange: PropTypes.func,
    prevLabel: PropTypes.string,
    renderItem: PropTypes.func,
    showSkipButton: PropTypes.bool,
    skipLabel: PropTypes.string,
    slides: PropTypes.arrayOf(PropTypes.object),
  }
  static defaultProps = {
    activeDotColor: 'rgba(255, 255, 255, .9)',
    bottomButton: false,
    doneLabel: 'Done',
    dotColor: 'rgba(0, 0, 0, .2)',
    hidePagination: false,
    nextLabel: 'Next',
    onDone: null,
    onSkip: null,
    onSlideChange: () => {},
    prevLabel: 'Back',
    renderItem: null,
    showSkipButton: false,
    skipLabel: 'Skip',
    slides: [],
  }

  constructor(props) {
    super(props)

    this.state = {
      width: appWidth,
      height: appHeight,
      activeIndex: 0,
    }
  }

  goToSlide = (pageNum) => {
    this.setState({
      activeIndex: pageNum,
    })
    this.flatList.scrollToOffset({
      offset: pageNum * this.state.width,
    })
  }

  _onNextPress = () => {
    const {
      onSlideChange,
    } = this.props

    this.goToSlide(this.state.activeIndex + 1)
    onSlideChange(this.state.activeIndex + 1, this.state.activeIndex)
  }
  _onPrevPress = () => {
    const {
      onSlideChange,
    } = this.props

    this.goToSlide(this.state.activeIndex - 1)
    onSlideChange(this.state.activeIndex - 1, this.state.activeIndex)
  }

  _renderItem = (item) => {
    const {
      height,
      width,
    } = this.state
    const {
      bottomButton,
      renderItem,
      showSkipButton,
    } = this.props
    const bottomSpacer = (bottomButton ? (showSkipButton ? 44 : 0) + 44 : 0) + (isIphoneX ? 34 : 0) + 64
    const topSpacer = (isIphoneX ? 44 : 0) + (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight)
    const props = {
      ...item.item,
      bottomSpacer,
      height,
      topSpacer,
      width,
    }

    return renderItem ? renderItem(props) : <DefaultSlide {...props} />
  }

  _renderButton = (name, onPress) => {
    const show = (name === 'Skip' || name === 'Prev') ? this.props[`show${name}Button`] : !this.props[`hide${name}Button`]
    const content = this.props[`render${name}Button`] ? this.props[`render${name}Button`]() : this._renderDefaultButton(name)

    return show && this._renderOuterButton(content, name, onPress)
  }

  _renderDefaultButton = (name) => {
    let content = <Text style={styles.buttonText}>{this.props[`${name.toLowerCase()}Label`]}</Text>

    if (this.props.bottomButton) {
      content = (
        <View style={[
          styles.bottomButton,
          (name === 'Skip' || name === 'Prev') && {
            backgroundColor: 'transparent',
          },
        ]}
        >
          {content}
        </View>
      )
    }

    return content
  }

  _renderOuterButton = (content, name, onPress) => {
    const style = (name === 'Skip' || name === 'Prev') ? styles.leftButtonContainer : styles.rightButtonContainer

    return (
      <View style={this.props.bottomButton ? styles.bottomButtonContainer : style}>
        <TouchableOpacity onPress={onPress} style={this.props.bottomButton && styles.flexOne}>
          {content}
        </TouchableOpacity>
      </View>
    )
  }

  _renderNextButton = () => this._renderButton('Next', this._onNextPress)

  _renderPrevButton = () => this._renderButton('Prev', this._onPrevPress)

  _renderDoneButton = () => this._renderButton('Done', this.props.onDone && this.props.onDone)

  _renderSkipButton = () => this._renderButton('Skip', this.props.onSkip && this.props.onSkip)

  _renderPagination = () => {
    const isLastSlide = this.state.activeIndex === (this.props.slides.length - 1)
    const isFirstSlide = this.state.activeIndex === 0
    const skipBtn = (!isFirstSlide && this._renderPrevButton()) || (!isLastSlide && this._renderSkipButton())
    const button = isLastSlide ? this._renderDoneButton() : this._renderNextButton()

    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {!this.props.bottomButton && skipBtn}
          {this.props.slides.length > 1 && this.props.slides.map((slide, i) => (
            <View
              key={i}
              style={[
                {
                  backgroundColor: i === this.state.activeIndex
                    ? this.props.activeDotColor
                    : this.props.dotColor,
                },
                styles.dot,
              ]}
            />
          ))}
          {!this.props.bottomButton && button}
        </View>
        {this.props.bottomButton && button}
        {this.props.bottomButton && skipBtn}
      </View>
    )
  }

  _onMomentumScrollEnd = (event) => {
    const {
      onSlideChange,
    } = this.props
    const offset = event.nativeEvent.contentOffset.x
    // Touching very very quickly and continuous brings about
    // a variation close to - but not quite - the width.
    // That's why we round the number.
    // Also, Android phones and their weird numbers
    const newIndex = Math.round(offset / this.state.width)

    if (newIndex === this.state.activeIndex) {
      // No page change, don't do anything
      return
    }

    const lastIndex = this.state.activeIndex

    this.setState({
      activeIndex: newIndex,
    })

    onSlideChange(newIndex, lastIndex)
  }

  _onLayout = () => {
    const {
      width, height,
    } = Dimensions.get('window')

    if (width !== this.state.width || height !== this.state.height) {
      // Set new width to update rendering of pages
      this.setState({
        width, height,
      })

      // Set new scroll position
      const nextScroll = () => {
        this.flatList.scrollToOffset({
          offset: this.state.activeIndex * width, animated: false,
        })
      }

      if (Platform.OS === 'android') {
        setTimeout(nextScroll, 0)
      } else {
        nextScroll()
      }
    }
  }

  render() {
    const {
      hidePagination,
    } = this.props

    return (
      <View style={styles.flexOne}>
        <FlatList
          ref={(ref) => this.flatList = ref} // eslint-disable-line
          data={this.props.slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.flexOne}
          renderItem={this._renderItem}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          extraData={this.state.width}
          onLayout={this._onLayout}
        />
        {!hidePagination && this._renderPagination()}
      </View>
    )
  }
}
