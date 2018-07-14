import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import {
  Query,
} from 'react-apollo'

import SearchUsersView from './SearchUsers'

import searchUsersQuery from 'api/users/query/searchUsers'

export default class SearchUsers extends React.Component {
  static propTypes = {
    search: PropTypes.string.isRequired,
  }

  onResult = (result) => {
    const {
      data,
      networkStatus,
    } = result

    return (
      <SearchUsersView
        networkStatus={networkStatus}
        data={get(data, 'users', {})}
      />
    )
  }

  render() {
    const {
      search,
    } = this.props

    return (
      <Query
        query={searchUsersQuery}
        variables={{
          username: search,
          first: 5,
        }}
        notifyOnNetworkStatusChange
      >
        {this.onResult}
      </Query>
    )
  }
}
