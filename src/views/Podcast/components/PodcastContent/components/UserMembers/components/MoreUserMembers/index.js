import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import UsersModal from 'components/UsersModal'
import podcastUserMembersQuery from 'api/podcasts/query/podcastUserMembers'

export default class MoreUserMembers extends React.PureComponent {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      fetchMore,
      networkStatus,
      refetch,
    } = result
    const {
      number,
    } = this.props

    return (
      <UsersModal
        number={number}
        title="Membres"
        users={get(data, 'podcast.members.data', []).map((item) => item.user)}
        pageInfo={get(data, 'podcast.members.pageInfo')}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'podcast.members.data.length', 0),
        },
        updateQuery: this.updateQuery,
      })}
      />
    )
  }

  updateQuery = (previousResult, { fetchMoreResult }) => { // eslint-disable-line
    const {
      data,
      pageInfo,
    } = fetchMoreResult.podcast.members
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.podcast.members

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      podcast: {
        ...previousResult.podcast,
        members: {
          ...previousResult.podcast.members,
          pageInfo,
          data: [
            ...previousData,
            ...data,
          ],
        },
      },
    }
  }

  render() {
    const {
      slug,
    } = this.props

    return (
      <Query
        query={podcastUserMembersQuery}
        variables={{
          slug,
          offset: 0,
          first: 10,
        }}
        notifyOnNetworkStatusChange
      >
        {this.onResult}
      </Query>
    )
  }
}
