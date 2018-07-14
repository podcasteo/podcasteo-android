import React from 'react'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastHorizontalList from 'components/PodcastHorizontalList'
import rankingsQuery from 'api/podcasts/query/rankings'

export default class PodcastsRanking extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toISOString(),
      first: 10,
      offset: 0,
    }
  }

  onResult = (result) => {
    const {
      data,
    } = result
    const podcasts = get(data, 'rankings.data', []).map((ranking) => ranking.podcast)

    return (
      <PodcastHorizontalList
        title="Podcasts du moment"
        podcasts={podcasts}
      />
    )
  }

  render() {
    const {
      date,
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
      >
        {this.onResult}
      </Query>
    )
  }
}
