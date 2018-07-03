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

import PodcastView from './Podcast'

import podcastQuery from 'api/podcasts/podcast'

class Podcast extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      error,
      loading,
    } = result
    const {
      match,
    } = this.props
    const id = get(match, 'params.id')

    if (error) {
      return (
        <View>
          <Text>ERROR</Text>
        </View>
      )
    }

    return (
      <PodcastView
        podcast={get(data, 'podcast', {
          id,
        })}
        loading={loading}
      />
    )
  }

  render() {
    const {
      match,
    } = this.props

    return (
      <Query
        query={podcastQuery}
        variables={{
          id: get(match, 'params.id'),
        }}
        fetchPolicy="cache-and-network"
      >
        {this.onResult}
      </Query>
    )
  }
}

@withRouter
export default class extends Podcast {}
