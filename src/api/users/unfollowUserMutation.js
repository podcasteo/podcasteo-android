import gql from 'graphql-tag'

export default gql`
  mutation deleteFollowUser($input: DeleteFollowUserEdgeInput!) {
    deleteFollowUser(input: $input) {
      result
    }
  }
`
