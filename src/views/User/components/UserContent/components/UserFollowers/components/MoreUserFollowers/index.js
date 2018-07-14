import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import UsersModal from 'components/UsersModal'
import userFollowersQuery from 'api/users/query/userFollowers'

export default class MoreUserFollowers extends React.PureComponent {
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
        title="Abonnées"
        users={get(data, 'user.followers.data', []).map((item) => item.user)}
        pageInfo={get(data, 'user.followers.pageInfo')}
        networkStatus={networkStatus}
        refetch={refetch}
        onLoadMore={() => fetchMore({
        variables: {
          offset: get(data, 'user.followers.data.length', 0),
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
    } = fetchMoreResult.user.followers
    const {
      data: previousData,
      pageInfo: previousPageInfo,
    } = previousResult.user.followers

    if (!previousPageInfo.hasNextPage) {
      return previousResult
    }

    return {
      user: {
        ...previousResult.user,
        followers: {
          ...previousResult.user.followers,
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
        query={userFollowersQuery}
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
