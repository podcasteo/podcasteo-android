import React from 'react'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastHorizontalList from 'components/PodcastHorizontalList'
import podcastsPodcasteoQuery from 'api/podcasts/query/podcastsPodcasteo'

export default class PodcastsPodcasteo extends React.Component {
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
    } = result

    return (
      <PodcastHorizontalList
        title="Podcasts du réseau Podcasteo"
        podcasts={get(data, 'podcasts.data', [])}
      />
    )
  }

  render() {
    const {
      first,
      offset,
    } = this.state

    return (
      <Query
        query={podcastsPodcasteoQuery}
        variables={{
          offset,
          first,
        }}
      >
        {this.onResult}
      </Query>
    )
  }
}
