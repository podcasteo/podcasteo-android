import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import PodcastMembersView from './PodcastMembers'

import userPodcastMembersQuery from 'api/users/query/userPodcastMembers'

export default class PodcastMembers extends React.PureComponent {
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
      <PodcastMembersView
        slug={slug}
        data={get(data, 'user.memberPodcasts')}
      />
    )
  }

  render() {
    const {
      slug,
    } = this.props

    return (
      <Query
        query={userPodcastMembersQuery}
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
