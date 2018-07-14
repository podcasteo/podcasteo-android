import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastContentView from './PodcastContent'

import podcastContentQuery from 'api/podcasts/query/podcastContent'

class PodcastContent extends React.PureComponent {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  }

  onResult = (result) => {
    const {
      data,
    } = result
    const {
      slug,
    } = this.props

    return (
      <PodcastContentView
        podcast={get(data, 'podcast', {
          slug,
        })}
      />
    )
  }

  render() {
    const {
      slug,
    } = this.props

    return (
      <Query
        query={podcastContentQuery}
        variables={{
          slug,
        }}
        fetchPolicy="cache-and-network"
      >
        {this.onResult}
      </Query>
    )
  }
}

export default class extends PodcastContent {}
