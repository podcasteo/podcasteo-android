import React from 'react'
import PropTypes from 'prop-types'
import { // eslint-disable-line
  MaterialIcons,
} from '@expo/vector-icons'
import {
  View,
  StyleSheet,
} from 'react-native'
import {
  Input,
} from 'react-native-elements'

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 5,
    right: 0,
  },
})

export default class PasswordInputText extends React.Component {
  static propTypes = {
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
  }

  static defaultProps = {
    iconSize: 25,
    iconColor: 'black',
  }

  constructor(props) {
    super(props)

    this.state = {
      icEye: 'visibility-off',
      password: true,
    }
  }

  onIconClick = () => {
    let newState

    if (this.state.password) {
      newState = {
        icEye: 'visibility',
        password: false,
      }
    } else {
      newState = {
        icEye: 'visibility-off',
        password: true,
      }
    }

    this.setState(newState)
  }

  render() {
    return (
      <View>
        <Input
          ref={this.props.inputRef} // eslint-disable-line
          secureTextEntry={this.state.password}
          {...this.props}
        />
        <MaterialIcons
          style={styles.icon}
          name={this.state.icEye}
          size={this.props.iconSize}
          color={this.props.iconColor}
          onPress={this.onIconClick}
        />
      </View>
    )
  }
}
