import gql from 'graphql-tag'

export default gql`
  query searchUsers($username: String, $first: Int) {
    users(username: $username, first: $first) {
      pageInfo {
        totalCount
        pageCount
        hasNextPage
        hasPreviousPage
      }
      data {
        id
        slug
        username
        avatar
      }
    }
  }
`
