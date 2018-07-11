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

export default class PageNotFoundComponent extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Page not found, Sorry!</Text>
      </View>
    )
  }
}
