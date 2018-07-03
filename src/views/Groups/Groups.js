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

export default class Groups extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Groups</Text>
      </View>
    )
  }
}
