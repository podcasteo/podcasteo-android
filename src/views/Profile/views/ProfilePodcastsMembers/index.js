import React from 'react'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import ProfilePodcastsMembersView from './ProfilePodcastsMembers'

import selfPodcastMembersQuery from 'api/users/query/selfPodcastMembers'

export default class ProfilePodcastsMembers extends React.PureComponent {
  onResult = (result) => {
    const {
      data,
      fetchMore,
      networkStatus,
      refetch,
    } = result

    return (
      <ProfilePodcastsMembersView
        data={get(data, 'self.memberPodcasts', {})}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'self.memberPodcasts.data.length', 0),
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
    } = fetchMoreResult.self.memberPodcasts
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.self.memberPodcasts

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      self: {
        ...previousResult.self,
        memberPodcasts: {
          ...previousResult.self.memberPodcasts,
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
        query={selfPodcastMembersQuery}
        variables={{
          offset: 0,
          first: 10,
        }}
        notifyOnNetworkStatusChange
      >
        {this.onResult}
      </Query>
    )
  }
}
