import React from 'react'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import ProfilePodcastsLikesView from './ProfilePodcastsLikes'

import selfPodcastLikesQuery from 'api/users/query/selfPodcastLikes'

export default class ProfilePodcastsLikes extends React.PureComponent {
  onResult = (result) => {
    const {
      data,
      fetchMore,
      networkStatus,
      refetch,
    } = result

    return (
      <ProfilePodcastsLikesView
        data={get(data, 'self.likePodcasts', {})}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'self.likePodcasts.data.length', 0),
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
    } = fetchMoreResult.self.likePodcasts
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.self.likePodcasts

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      self: {
        ...previousResult.self,
        likePodcasts: {
          ...previousResult.self.likePodcasts,
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
        query={selfPodcastLikesQuery}
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
