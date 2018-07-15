import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import UsersModal from 'components/UsersModal'
import userFollowingQuery from 'api/users/query/userFollowing'

export default class MoreUserFollowing extends React.PureComponent {
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
        title="Abonnés"
        users={get(data, 'user.following.data', []).map((item) => item.user)}
        pageInfo={get(data, 'user.following.pageInfo')}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'user.following.data.length', 0),
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
    } = fetchMoreResult.user.following
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.user.following

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      user: {
        ...previousResult.user,
        following: {
          ...previousResult.user.following,
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
        query={userFollowingQuery}
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
