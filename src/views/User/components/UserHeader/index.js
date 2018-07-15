import {
  withRouter,
} from 'react-router-native'
import {
  graphql,
} from 'react-apollo'

import UserHeaderView from './UserHeader'

import followUserMutation from 'api/users/mutation/followUser'
import unfollowUserMutation from 'api/users/mutation/unfollowUser'
import userQuery from 'api/users/query/user'
import userFollowersQuery from 'api/users/query/userFollowers'
import userFollowingQuery from 'api/users/query/userFollowing'

@graphql(followUserMutation, {
  props: ({
    mutate,
  }) => ({
    followUser: (id) => mutate({
      variables: {
        input: {
          id,
        },
      },
    }),
  }),
  options: (props) => ({
    refetchQueries:
    () => ([
      {
        query: userQuery,
        variables: {
          slug: props.user.slug,
        },
      },
      {
        query: userFollowersQuery,
        variables: {
          slug: props.user.slug,
          first: 3,
          offset: 0,
        },
      },
      {
        query: userFollowingQuery,
        variables: {
          slug: props.user.slug,
          first: 3,
          offset: 0,
        },
      },
    ]),
  }),
})

@graphql(unfollowUserMutation, {
  props: ({
    mutate,
  }) => ({
    unfollowUser: (id) => mutate({
      variables: {
        input: {
          _to: id,
        },
      },
    }),
  }),
  options: (props) => ({
    refetchQueries:
    () => ([
      {
        query: userQuery,
        variables: {
          slug: props.user.slug,
        },
      },
      {
        query: userFollowersQuery,
        variables: {
          slug: props.user.slug,
          first: 3,
          offset: 0,
        },
      },
      {
        query: userFollowingQuery,
        variables: {
          slug: props.user.slug,
          first: 3,
          offset: 0,
        },
      },
    ]),
  }),
})
@withRouter
export default class UserHeader extends UserHeaderView {}
