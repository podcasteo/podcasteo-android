import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import SearchPodcastsView from './SearchPodcasts'

import searchPodcastsQuery from 'api/podcasts/query/searchPodcasts'

export default class SearchPodcasts extends React.Component {
  static propTypes = {
    search: PropTypes.string.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      networkStatus,
    } = result

    return (
      <SearchPodcastsView
        networkStatus={networkStatus}
        data={get(data, 'podcasts', {})}
      />
    )
  }

  render() {
    const {
      search,
    } = this.props

    return (
      <Query
        query={searchPodcastsQuery}
        variables={{
          name: search,
          first: 5,
        }}
        notifyOnNetworkStatusChange
      >
        {this.onResult}
      </Query>
    )
  }
}
