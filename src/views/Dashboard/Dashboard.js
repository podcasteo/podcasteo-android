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
  },
})

import WebRadio from './components/WebRadio'

export default class Dashboard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WebRadio />
        <Text>This is Dashboard</Text>
      </View>
    )
  }
}
