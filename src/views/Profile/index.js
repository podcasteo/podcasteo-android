import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'
import {
  withRouter,
} from 'react-router-native'

import ProfileView from './Profile'

import ErrorView from 'components/ErrorView'
import selfQuery from 'api/users/query/self'

class Profile extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      error,
      loading,
    } = result
    const {
      history,
    } = this.props

    if (error) {
      return <ErrorView error={error} />
    }

    return (
      <ProfileView
        history={history}
        user={get(data, 'self')}
        loading={loading}
      />
    )
  }

  render() {
    return (
      <Query
        query={selfQuery}
        fetchPolicy="cache-and-network"
      >
        {this.onResult}
      </Query>
    )
  }
}

@withRouter
export default class extends Profile {}
