import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class Podcast extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Podcast</Text>
      </View>
    )
  }
}
