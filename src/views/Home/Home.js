import React from 'react'
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import settings from 'helpers/settings'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class Home extends React.Component {
  clearStorage = async () => {
    await AsyncStorage.removeItem(settings.authToken)
    await AsyncStorage.removeItem(settings.introduction)

    return true
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Home</Text>
        <Button
          onPress={this.clearStorage}
          title="clear storage"
        />
      </View>
    )
  }
}
