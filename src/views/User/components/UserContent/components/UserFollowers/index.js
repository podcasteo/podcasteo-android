import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import UserFollowersView from './UserFollowers'

import userFollowersQuery from 'api/users/userFollowers'

export default class UserFollowers extends React.PureComponent {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  }

  onResult = (result) => {
    const {
      data,
    } = result
    const {
      slug,
    } = this.props

    return (
      <UserFollowersView
        slug={slug}
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
