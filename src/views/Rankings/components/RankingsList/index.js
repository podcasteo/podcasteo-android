import React from 'react'
import PropTypes from 'prop-types'
import {
  Query,
} from 'react-apollo'

import RankingsListView from './RankingsList'

import rankingsQuery from 'api/podcasts/query/rankings'
import ErrorView from 'components/ErrorView'

export default class RankingsList extends React.PureComponent {
  static propTypes = {
    date: PropTypes.string.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      error,
      fetchMore,
      networkStatus,
      refetch,
    } = result

    if (error) {
      return <ErrorView error={error} />
    }

    return (
      <RankingsListView
        networkStatus={networkStatus}
        rankings={data.rankings}
        refetch={refetch}
        onLoadMore={() => fetchMore({
          variables: {
            offset: data.rankings.data.length,
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
    } = fetchMoreResult.rankings
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.rankings

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      rankings: {
        pageInfo,
        __typename: previousResult.rankings.__typename,
        data: [
          ...previousData,
          ...data,
        ],
      },
    }
  }

  render() {
    const {
      date,
    } = this.props

    return (
      <Query
        query={rankingsQuery}
        variables={{
          date,
          offset: 0,
          first: 20,
        }}
        notifyOnNetworkStatusChange
      >
        {this.onResult}
      </Query>
    )
  }
}
