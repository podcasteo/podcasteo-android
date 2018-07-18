import React from 'react'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import ProfileUsersFollowingView from './ProfileUsersFollowing'

import selfUserFollowingQuery from 'api/users/query/selfUserFollowing'

export default class ProfilePodcastsMembers extends React.PureComponent {
  onResult = (result) => {
    const {
      data,
      fetchMore,
      networkStatus,
      refetch,
    } = result

    return (
      <ProfileUsersFollowingView
        data={get(data, 'self.following', {})}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'self.following.data.length', 0),
        },
        updateQuery: this.updateQuery,
      })}
      />
    )
  }

  updateQuery = (previousResult, { fetchMoreResult }) => { // eslint-disable-line
    const {
      data,
      pageInfo,
    } = fetchMoreResult.self.following
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.self.following

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      self: {
        ...previousResult.self,
        following: {
          ...previousResult.self.following,
          pageInfo,
          data: [
            ...previousData,
            ...data,
          ],
        },
      },
    }
  }

  render() {
    return (
      <Query
        query={selfUserFollowingQuery}
        variables={{
          offset: 0,
          first: 10,
        }}
        fetchPolicy="cache-and-network"
        notifyOnNetworkStatusChange
      >
        {this.onResult}
      </Query>
    )
  }
}
