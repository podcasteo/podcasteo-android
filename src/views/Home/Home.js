import React from 'react'
import PropTypes from 'prop-types'
import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-native'

import settings from 'helpers/settings'
import BottomNavigation from 'components/BottomNavigation'
import Dashboard from 'views/Dashboard'
import Group from 'views/Group'
import Groups from 'views/Groups'
import Podcast from 'views/Podcast'
import Rankings from 'views/Rankings'
import Search from 'views/Search'
import Settings from 'views/Settings'
import User from 'views/User'
import Users from 'views/Users'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
})

export default class Home extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  clearStorage = async () => {
    await AsyncStorage.removeItem(settings.authToken)
    await AsyncStorage.removeItem(settings.introduction)

    return true
  }

  render() {
    return (
      <View style={styles.container}>
        <Switch>
          <Route path="/app/dashboard" component={Dashboard} exact />
          <Route path="/app/rankings" component={Rankings} exact />
          <Route path="/app/podcasts/:id" component={Podcast} />
          <Route path="/app/groups" component={Groups} exact />
          <Route path="/app/groups/:id" component={Group} />
          <Route path="/app/users" component={Users} exact />
          <Route path="/app/users/:id" component={User} />
          <Route path="/app/search" component={Search} exact />
          <Route path="/app/settings" component={Settings} exact />
          <Redirect to="/app/dashboard" />
        </Switch>
        <BottomNavigation currentPath={this.props.location.pathname} />
      </View>
    )
  }
}
