import gql from 'graphql-tag'

export default gql`
  query selfUserFollowers($first: Int, $offset: Int) {
    self {
      id
      following(first: $first, offset: $offset) {
        pageInfo {
          totalCount
          pageCount
          hasNextPage
          hasPreviousPage
        }
        data {
          id
          createdAt
          user {
            id
            slug
            username
            avatar
          }
        }
      }
    }
  }
`
