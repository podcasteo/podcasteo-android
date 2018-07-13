import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastsModal from 'components/PodcastsModal'
import userPodcastLikesQuery from 'api/users/userPodcastLikes'

export default class MorePodcastLikes extends React.PureComponent {
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
        title="Mention J'aime"
        podcasts={get(data, 'user.likePodcasts.data', []).map((item) => item.podcast)}
        pageInfo={get(data, 'user.likePodcasts.pageInfo')}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'user.likePodcasts.data.length', 0),
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
    } = fetchMoreResult.user.likePodcasts
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.user.likePodcasts

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      user: {
        ...previousResult.user,
        likePodcasts: {
          ...previousResult.user.likePodcasts,
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
        query={userPodcastLikesQuery}
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
