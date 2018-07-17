import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'
import {
  withRouter,
} from 'react-router-native'

import RankingBarView from './RankingBar'

import podcastRankingsQuery from 'api/podcasts/query/podcastRankings'

class RankingBar extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      loading,
    } = result
    let resultData = {
      audienceScore: -1,
      frequencyScore: -1,
      itunesScore: -1,
      networkScore: -1,
    }

    if (!loading) {
      resultData = get(data, 'podcast.rankings.data[0].data', {})
    }

    return (
      <RankingBarView
        ranking={resultData}
      />
    )
  }

  render() {
    const {
      match,
    } = this.props

    return (
      <Query
        query={podcastRankingsQuery}
        variables={{
          slug: get(match, 'params.slug'),
          first: 1,
          offset: 0,
        }}
        fetchPolicy="cache-and-network"
      >
        {this.onResult}
      </Query>
    )
  }
}

@withRouter
export default class extends RankingBar {}
