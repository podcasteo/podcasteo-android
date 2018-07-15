import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import UserMembersView from './UserMembers'

import podcastUserMembersQuery from 'api/podcasts/query/podcastUserMembers'

export default class UserMembers extends React.PureComponent {
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
      <UserMembersView
        slug={slug}
        networkStatus={networkStatus}
        data={get(data, 'podcast.members')}
      />
    )
  }

  render() {
    const {
      slug,
    } = this.props

    return (
      <Query
        query={podcastUserMembersQuery}
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
