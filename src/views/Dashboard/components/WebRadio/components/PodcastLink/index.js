import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastItem from 'components/PodcastItem'
import podcastQuery from 'api/podcasts/query/podcast'

export default class PodcastLink extends React.PureComponent {
  static propTypes = {
    slug: PropTypes.string,
  }

  static defaultProps = {
    slug: null,
  }

  onResult = (result) => {
    const {
      data,
    } = result

    return (
      <PodcastItem
        podcast={get(data, 'podcast')}
      />
    )
  }

  render() {
    const {
      slug,
    } = this.props

    return (!slug
      ?
        <PodcastItem />
      :
        <Query
          query={podcastQuery}
          variables={{
              slug,
            }}
          fetchPolicy="cache-first"
        >
          {this.onResult}
        </Query>
    )
  }
}
