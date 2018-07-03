import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class Users extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Users</Text>
      </View>
    )
  }
}
