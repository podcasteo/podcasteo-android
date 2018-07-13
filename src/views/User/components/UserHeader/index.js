import {
  withRouter,
} from 'react-router-native'
import {
  graphql,
} from 'react-apollo'

import UserHeaderView from './UserHeader'

import followUserMutation from 'api/users/followUserMutation'
import unfollowUserMutation from 'api/users/unfollowUserMutation'
import userQuery from 'api/users/user'
import userFollowersQuery from 'api/users/userFollowers'

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
          first: 5,
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
          first: 5,
          offset: 0,
        },
      },
    ]),
  }),
})
@withRouter
export default class UserHeader extends UserHeaderView {}
