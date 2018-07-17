import React from 'react'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastsWomenView from './PodcastsWomen'

import podcastsWomenQuery from 'api/podcasts/query/podcastsWomen'

export default class PodcastsWomen extends React.Component {
  onResult = (result) => {
    const {
      data,
    } = result

    return (
      <PodcastsWomenView
        data={get(data, 'podcasts', {})}
      />
    )
  }

  render() {
    return (
      <Query
        query={podcastsWomenQuery}
        variables={{
          offset: 0,
          first: 8,
        }}
      >
        {this.onResult}
      </Query>
    )
  }
}
