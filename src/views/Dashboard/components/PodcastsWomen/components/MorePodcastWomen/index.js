import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastsModal from 'components/PodcastsModal'
import podcastsWomenQuery from 'api/podcasts/query/podcastsWomen'

export default class MorePodcastWomen extends React.PureComponent {
  static propTypes = {
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
        title="Podcasts par des femmes"
        podcasts={get(data, 'podcasts.data', [])}
        pageInfo={get(data, 'podcasts.pageInfo')}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'podcasts.data.length', 0),
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
    } = fetchMoreResult.podcasts
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.podcasts

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      podcasts: {
        ...previousResult.podcasts,
        pageInfo,
        data: [
          ...previousData,
          ...data,
        ],
      },
    }
  }

  render() {
    return (
      <Query
        query={podcastsWomenQuery}
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
