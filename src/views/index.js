import React from 'react'
import {
  ApolloProvider,
} from 'react-apollo'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  BackButton,
  NativeRouter,
  Switch,
  Route,
} from 'react-router-native'
import {
  Constants,
} from 'expo'

import apolloClient from 'helpers/apolloClient'
import CheckLoggedIn from 'views/CheckLoggedIn'
import Home from 'views/Home'
import Introduction from 'views/Introduction'
import Login from 'views/Login'

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
          <BackButton>
            <View style={styles.container}>
              <View style={styles.statusBar} />
              <Switch>
                <Route path="/" component={CheckLoggedIn} exact />
                <Route path="/introduction" component={Introduction} exact />
                <Route path="/login" component={Login} />
                <Route path="/app" component={Home} />
              </Switch>
            </View>
          </BackButton>
        </NativeRouter>
      </ApolloProvider>
    )
  }
}
