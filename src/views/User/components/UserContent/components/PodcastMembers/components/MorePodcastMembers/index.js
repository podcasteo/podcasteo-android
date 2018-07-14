import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastsModal from 'components/PodcastsModal'
import userPodcastMembersQuery from 'api/users/query/userPodcastMembers'

export default class MorePodcastMembers extends React.PureComponent {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      fetchMore,
      networkStatus,
      refetch,
    } = result
    const {
      number,
    } = this.props

    return (
      <PodcastsModal
        number={number}
        title="Membre de"
        podcasts={get(data, 'user.memberPodcasts.data', []).map((item) => item.podcast)}
        pageInfo={get(data, 'user.memberPodcasts.pageInfo')}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'user.memberPodcasts.data.length', 0),
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
    } = fetchMoreResult.user.memberPodcasts
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.user.memberPodcasts

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      user: {
        ...previousResult.user,
        memberPodcasts: {
          ...previousResult.user.memberPodcasts,
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
    const {
      slug,
    } = this.props

    return (
      <Query
        query={userPodcastMembersQuery}
        variables={{
          slug,
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
