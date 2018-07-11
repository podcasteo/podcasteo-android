import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'
import {
  View,
  Text,
} from 'react-native'
import {
  withRouter,
} from 'react-router-native'

import PodcastContentView from './PodcastContent'

import podcastContentQuery from 'api/podcasts/podcastContent'

class PodcastContent extends React.PureComponent {
  static propTypes = {
    podcastSlug: PropTypes.string.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      error,
      loading,
    } = result

    if (error) {
      return (
        <View>
          <Text>ERROR</Text>
        </View>
      )
    }

    return (
      <PodcastContentView
        podcast={get(data, 'podcast', {})}
        loading={loading}
      />
    )
  }

  render() {
    const {
      podcastSlug,
    } = this.props

    return (
      <Query
        query={podcastContentQuery}
        variables={{
          slug: podcastSlug,
        }}
        fetchPolicy="cache-and-network"
      >
        {this.onResult}
      </Query>
    )
  }
}
@withRouter
export default class extends PodcastContent {}
