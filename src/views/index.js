import React from 'react'
import {
  ApolloProvider,
} from 'react-apollo'
import {
  NativeRouter,
} from 'react-router-native'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  Constants,
} from 'expo'

import routes from 'helpers/routes'
import apolloClient from 'helpers/apolloClient'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  statusBar: {
    height: Constants.statusBarHeight,
  },
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <NativeRouter>
          <View style={styles.container}>
            <View style={styles.statusBar} />
            {routes}
          </View>
        </NativeRouter>
      </ApolloProvider>
    )
  }
}
