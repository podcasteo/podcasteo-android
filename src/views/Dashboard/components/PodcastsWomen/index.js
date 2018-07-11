import React from 'react'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastHorizontalList from 'components/PodcastHorizontalList'
import podcastsWomenQuery from 'api/podcasts/podcastsWomen'

export default class PodcastsWomen extends React.Component {
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
        title="Podcasts par des femmes"
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
        query={podcastsWomenQuery}
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
