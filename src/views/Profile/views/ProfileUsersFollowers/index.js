import React from 'react'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import ProfileUsersFollowersView from './ProfileUsersFollowers'

import selfUserFollowersQuery from 'api/users/query/selfUserFollowers'

export default class ProfilePodcastsMembers extends React.PureComponent {
  onResult = (result) => {
    const {
      data,
      fetchMore,
      networkStatus,
      refetch,
    } = result

    return (
      <ProfileUsersFollowersView
        data={get(data, 'self.followers', {})}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'self.followers.data.length', 0),
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
    } = fetchMoreResult.self.followers
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.self.followers

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      self: {
        ...previousResult.self,
        followers: {
          ...previousResult.self.followers,
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
        query={selfUserFollowersQuery}
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
