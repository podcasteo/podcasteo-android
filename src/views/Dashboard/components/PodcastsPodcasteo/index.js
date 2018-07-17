import React from 'react'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastsPodcasteoView from './PodcastsPodcasteo'

import podcastsPodcasteoQuery from 'api/podcasts/query/podcastsPodcasteo'

export default class PodcastsPodcasteo extends React.Component {
  onResult = (result) => {
    const {
      data,
    } = result

    return (
      <PodcastsPodcasteoView
        data={get(data, 'podcasts', {})}
      />
    )
  }

  render() {
    return (
      <Query
        query={podcastsPodcasteoQuery}
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
