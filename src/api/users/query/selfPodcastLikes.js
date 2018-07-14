import gql from 'graphql-tag'

export default gql`
  query selfPodcastLikes($first: Int, $offset: Int) {
    self {
      id
      likePodcasts(first: $first, offset: $offset) {
        pageInfo {
          totalCount
          pageCount
          hasNextPage
          hasPreviousPage
        }
        data {
          id
          createdAt
          podcast {
            id
            slug
            name
            avatar
          }
        }
      }
    }
  }
`
