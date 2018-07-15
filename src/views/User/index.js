import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'
import {
  withRouter,
} from 'react-router-native'

import UserView from './User'

import ErrorView from 'components/ErrorView'
import userQuery from 'api/users/query/user'

class User extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      error,
      loading,
    } = result
    const {
      match,
    } = this.props
    const slug = get(match, 'params.slug')

    if (error) {
      return <ErrorView error={error} />
    }

    return (
      <UserView
        user={get(data, 'user', {
          slug,
        })}
        loading={loading}
      />
    )
  }

  render() {
    const {
      match,
    } = this.props

    return (
      <Query
        query={userQuery}
        variables={{
          slug: get(match, 'params.slug'),
        }}
      >
        {this.onResult}
      </Query>
    )
  }
}

@withRouter
export default class extends User {}
