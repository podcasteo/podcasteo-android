import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import UserFollowersView from './UserFollowers'

import userFollowersQuery from 'api/users/query/userFollowers'

export default class UserFollowers extends React.PureComponent {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      networkStatus,
    } = result
    const {
      slug,
    } = this.props

    return (
      <UserFollowersView
        slug={slug}
        networkStatus={networkStatus}
        data={get(data, 'user.followers')}
      />
    )
  }

  render() {
    const {
      slug,
    } = this.props

    return (
      <Query
        query={userFollowersQuery}
        variables={{
          slug,
          first: 3,
          offset: 0,
        }}
        fetchPolicy="network-only"
        notifyOnNetworkStatusChange
      >
        {this.onResult}
      </Query>
    )
  }
}
