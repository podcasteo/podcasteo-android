import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastLikesView from './PodcastLikes'

import userPodcastLikesQuery from 'api/users/userPodcastLikes'

export default class PodcastLikes extends React.PureComponent {
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
      <PodcastLikesView
        slug={slug}
        data={get(data, 'user.likePodcasts')}
      />
    )
  }

  render() {
    const {
      slug,
    } = this.props

    return (
      <Query
        query={userPodcastLikesQuery}
        variables={{
          slug,
          first: 5,
          offset: 0,
        }}
        fetchPolicy="cache-and-network"
      >
        {this.onResult}
      </Query>
    )
  }
}
