import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import UsersModal from 'components/UsersModal'
import podcastUserLikesQuery from 'api/podcasts/query/podcastUserLikes'

export default class MoreUserLikes extends React.PureComponent {
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
      <UsersModal
        number={number}
        title="Abonnés"
        users={get(data, 'podcast.likes.data', []).map((item) => item.user)}
        pageInfo={get(data, 'podcast.likes.pageInfo')}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'podcast.likes.data.length', 0),
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
    } = fetchMoreResult.podcast.likes
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.podcast.likes

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      podcast: {
        ...previousResult.podcast,
        likes: {
          ...previousResult.podcast.likes,
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
        query={podcastUserLikesQuery}
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
