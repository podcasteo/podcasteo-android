import React from 'react'
import PropTypes from 'prop-types'
import {
  Query,
} from 'react-apollo'
import {
  Text,
  View,
} from 'react-native'

import RankingsListView from './RankingsList'

import rankingsQuery from 'api/podcasts/rankings'
import Loader from 'components/Loader'

export default class RankingsList extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      first: 10,
      offset: 0,
    }
  }

  onResult = (result) => {
    const {
      data,
      loading,
      fetchMore,
      error,
    } = result
    const {
      offset,
      first,
    } = this.state

    if (loading) {
      return <Loader />
    }

    if (error) {
      return (
        <View>
          <Text>ERROR</Text>
        </View>
      )
    }

    return (
      <RankingsListView
        rankings={data ? data.rankings.data : []}
        pageInfo={data ? data.rankings.pageInfo : {}}
        onLoadMore={() => fetchMore({
          variables: {
            offset: offset + first,
          },
          updateQuery: this.updateQuery,
        })}
      />
    )
  }

  updateQuery = (previousResult, result) => {
    const {
      fetchMoreResult,
    } = result
    const {
      data,
      pageInfo,
    } = fetchMoreResult.rankings

    if (!previousResult.pageInfo.hasNextPage) {
      return previousResult
    }

    return {
      pageInfo,
      __typename: previousResult.rankings.__typename,
      data: [
        ...previousResult.rankings.data,
        ...data,
      ],
    }
  }

  render() {
    const {
      date,
    } = this.props
    const {
      first,
      offset,
    } = this.state

    return (
      <Query
        query={rankingsQuery}
        variables={{
          date,
          offset,
          first,
        }}
        fetchPolicy="cache-and-network"
      >
        {this.onResult}
      </Query>
    )
  }
}
