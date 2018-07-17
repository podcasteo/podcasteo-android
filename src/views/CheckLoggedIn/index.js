import React from 'react'
import {
  Query,
} from 'react-apollo'
import {
  AsyncStorage,
} from 'react-native'
import {
  Redirect,
} from 'react-router-native'

import CheckLoggedInView from './CheckLoggedIn'

import selfQuery from 'api/users/query/self'
import settings from 'helpers/settings'

export default class CheckLoggedIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      introduction: false,
    }
  }

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem(settings.introduction)

      if (!value) {
        throw new Error()
      }
    } catch (error) {
      this.setState({
        introduction: true,
      })
    }
  }

  render() {
    const {
      introduction,
    } = this.state

    return (

      <Query query={selfQuery}>
        {
          ({
            error,
            loading,
          }) => {
            if (loading) return <CheckLoggedInView />
            if (introduction) return <Redirect to="/introduction" />
            if (error) return <Redirect to="/login" />

            return <Redirect to="/app/dashboard" />
          }
        }
      </Query>
    )
  }
}
