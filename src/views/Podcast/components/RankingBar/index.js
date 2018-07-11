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

import podcastRankingsQuery from 'api/podcasts/podcastRankings'

class RankingBar extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      first: 1,
      offset: 0,
    }
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
      resultData = get(data.podcast, 'rankings.data[0].data', {})
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
    const {
      first,
      offset,
    } = this.state

    return (
      <Query
        query={podcastRankingsQuery}
        variables={{
          slug: get(match, 'params.slug'),
          first,
          offset,
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