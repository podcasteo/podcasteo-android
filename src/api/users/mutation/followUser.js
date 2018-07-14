import gql from 'graphql-tag'

export default gql`
  mutation createFollowUser($input: FollowUserEdgeInput!) {
    createFollowUser(input: $input) {
      id
    }
  }
`
