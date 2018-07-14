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
import Podcast from 'views/Podcast'
import Rankings from 'views/Rankings'
import Search from 'views/Search'
import User from 'views/User'
import Profile from 'views/Profile'
import ProfilePodcastsMembers from 'views/Profile/views/ProfilePodcastsMembers'
import ProfilePodcastsLikes from 'views/Profile/views/ProfilePodcastsLikes'
import ProfileUsersFollowers from 'views/Profile/views/ProfileUsersFollowers'
import ProfileUsersFollowing from 'views/Profile/views/ProfileUsersFollowing'
import ProfileSettingsAvatar from 'views/Profile/views/ProfileSettingsAvatar'
import ProfileSettingsNetworks from 'views/Profile/views/ProfileSettingsNetworks'
import ProfileSettingsInformation from 'views/Profile/views/ProfileSettingsInformation'
import ProfileOthersDisconnect from 'views/Profile/views/ProfileOthersDisconnect'
import ProfileOthersAbout from 'views/Profile/views/ProfileOthersAbout'

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
          {/* app Dashboard */}
          <Route path="/app/dashboard" component={Dashboard} exact />
          {/* app Rankings */}
          <Route path="/app/rankings" component={Rankings} exact />
          {/* app Podcast */}
          <Route path="/app/podcasts/:slug" component={Podcast} />
          {/* app User */}
          <Route path="/app/users/:slug" component={User} />
          {/* app Search */}
          <Route path="/app/search" component={Search} exact />

          {/* app Profile */}
          <Route path="/app/profile" component={Profile} exact />
          <Route path="/app/profile/podcasts/members" component={ProfilePodcastsMembers} exact />
          <Route path="/app/profile/podcasts/likes" component={ProfilePodcastsLikes} exact />
          <Route path="/app/profile/users/followers" component={ProfileUsersFollowers} exact />
          <Route path="/app/profile/users/following" component={ProfileUsersFollowing} exact />
          <Route path="/app/profile/settings/avatar" component={ProfileSettingsAvatar} exact />
          <Route path="/app/profile/settings/networks" component={ProfileSettingsNetworks} exact />
          <Route path="/app/profile/settings/information" component={ProfileSettingsInformation} exact />
          <Route path="/app/profile/others/disconnect" component={ProfileOthersDisconnect} exact />
          <Route path="/app/profile/others/about" component={ProfileOthersAbout} exact />

          <Redirect to="/app/dashboard" />
        </Switch>
        <BottomNavigation currentPath={this.props.location.pathname} />
      </View>
    )
  }
}
