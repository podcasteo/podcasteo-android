/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native'

import BaseInput from './BaseInput'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 0,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 18,
  },
  passwordIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
})

export default class Hideo extends BaseInput {
  static propTypes = {
    /*
     * this is applied as background color of icon
     */
    iconBackgroundColor: PropTypes.string,

    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    iconClass: PropTypes.func.isRequired,
    /*
     * Passed to react-native-vector-icons library as name prop
     */
    iconName: PropTypes.string.isRequired,
    /*
     * Passed to react-native-vector-icons library as color prop
     */
    iconColor: PropTypes.string,
    /*
     * Passed to react-native-vector-icons library as size prop.
     */
    iconSize: PropTypes.number,

    isPassword: PropTypes.bool,
  };

  static defaultProps = {
    iconColor: 'white',
    iconSize: 25,
    iconBackgroundColor: '#899dda',
    height: 48,
    animationDuration: 200,
    isPassword: false,
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconSize,
      iconName,
      iconBackgroundColor,
      style: containerStyle,
      inputStyle,
      height: inputHeight,
      isPassword,
    } = this.props
    const {
      focusedAnim,
      showPassword,
      value,
    } = this.state
    const AnimatedIcon = Animated.createAnimatedComponent(iconClass)

    return (
      <View
        style={[
          styles.container,
          containerStyle,
        ]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              backgroundColor: iconBackgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
              height: inputHeight,
              width: focusedAnim.interpolate({
                inputRange: [
                  0,
                  1,
                ],
                outputRange: [
                  60,
                  40,
                ],
              }),
            }}
          >
            <AnimatedIcon
              name={iconName}
              color={iconColor}
              style={{
                fontSize: focusedAnim.interpolate({
                  inputRange: [
                    0,
                    1,
                  ],
                  outputRange: [
                    iconSize,
                    iconSize * 0.6,
                  ],
                }),
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref="input"
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid="transparent"
          secureTextEntry={isPassword && !showPassword}
        />
        {
          isPassword && (
            <TouchableWithoutFeedback
              onPress={() => this.setState({
                showPassword: !showPassword,
              })}
            >
              <View
                style={[
                  {
                    height: inputHeight,
                  },
                  styles.passwordIcon,
                ]}
              >
                <AnimatedIcon
                  name={showPassword ? 'eye' : 'eye-slash'}
                  color="black"
                  style={{
                    fontSize: iconSize,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          )
        }
      </View>
    )
  }
}
