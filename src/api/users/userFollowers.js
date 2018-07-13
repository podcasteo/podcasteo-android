import gql from 'graphql-tag'

export default gql`
  query userContent($slug: String, $first: Int, $offset: Int) {
    user(slug: $slug) {
      id
      followers(first: $first, offset: $offset) {
        pageInfo {
          totalCount
          pageCount
          hasNextPage
          hasPreviousPage
        }
        data {
          id
          user {
            id
            slug
            avatar
            username
          }
        }
      }
    }
  }
`
