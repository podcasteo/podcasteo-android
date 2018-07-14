import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import UserLikesView from './UserLikes'

import podcastUserLikesQuery from 'api/podcasts/query/podcastUserLikes'

export default class UserLikes extends React.PureComponent {
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
      <UserLikesView
        slug={slug}
        data={get(data, 'podcast.likes')}
      />
    )
  }

  render() {
    const {
      slug,
    } = this.props

    return (
      <Query
        query={podcastUserLikesQuery}
        variables={{
          slug,
          first: 3,
          offset: 0,
        }}
        fetchPolicy="network-only"
      >
        {this.onResult}
      </Query>
    )
  }
}
