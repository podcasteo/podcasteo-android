import gql from 'graphql-tag'

export default gql`
  query podcastUserLikes($slug: String, $first: Int, $offset: Int) {
    podcast(slug: $slug) {
      id
      slug
      likes(first: $first, offset: $offset) {
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
            avatar
            slug
            username
          }
        }
      }
    }
  }
`
