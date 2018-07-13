import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import UserContent from './components/UserContent'
import UserHeader from './components/UserHeader'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default class User extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
  }

  static defaultProps = {
    loading: true,
  }

  render() {
    const {
      loading,
      user,
    } = this.props

    return (
      <View style={styles.container}>
        <UserHeader loading={loading} user={user} />
        <UserContent user={user} />
      </View>
    )
  }
}
