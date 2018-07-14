import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import UserFollowingView from './UserFollowing'

import userFollowingQuery from 'api/users/query/userFollowing'

export default class UserFollowing extends React.PureComponent {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  }

  onResult = (result) => {
    const {
      data,
    } = result

    return (
      <UserFollowingView
        data={get(data, 'user.following')}
      />
    )
  }

  render() {
    const {
      slug,
    } = this.props

    return (
      <Query
        query={userFollowingQuery}
        variables={{
          slug,
          first: 5,
          offset: 0,
        }}
        fetchPolicy="cache-and-network"
      >
        {this.onResult}
      </Query>
    )
  }
}
