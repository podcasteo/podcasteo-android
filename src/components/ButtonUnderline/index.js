import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  text: {
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
})

export default class ButtonUnderline extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    underline: PropTypes.bool,
  }

  static defaultProps = {
    underline: false,
  }

  render() {
    const {
      onPress,
      title,
      underline,
    } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text style={underline && styles.text}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
