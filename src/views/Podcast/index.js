import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'
import {
  withRouter,
} from 'react-router-native'

import PodcastView from './Podcast'

import ErrorView from 'components/ErrorView'
import podcastQuery from 'api/podcasts/query/podcast'

class Podcast extends React.PureComponent {
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
    const slug = get(match, 'params.slug')

    if (error) {
      return <ErrorView error={error} />
    }

    return (
      <PodcastView
        podcast={get(data, 'podcast', {
          slug,
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
          slug: get(match, 'params.slug'),
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
